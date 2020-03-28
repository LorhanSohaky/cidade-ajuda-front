import React, { useState } from 'react'

import {
  Box,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  List,
  ListItem
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { useAsync } from 'react-async-hook'
import throttle from 'lodash/throttle'
import openGeocoder from 'node-open-geocoder'
import API from '../../services/api'

const Report = () => {
  const [region, setRegion] = useState([])
  const [types, setTypes] = useState({})

  React.useEffect(() => {
    API.getTypes().then(({ data }) => {
      const transformatedData = data.results.reduce((obj, { id, titulo }) => {
        obj[id] = { id, titulo }
        return obj
      }, {})
      setTypes(transformatedData)
    })
  }, [])

  const onSelectRegion = (event, value) => {
    if (value) {
      API.getReport(value.placeId)
        .then(({ data }) => {
          const incidents = data.reduce((obj, item) => {
            obj[item.tipo] = [...(obj[item.tipo] || []), item]
            return obj
          }, {})

          const groupedData = Object.keys(incidents).map(incidentType => ({
            ...types[incidentType],
            incidents: incidents[incidentType]
          }))

          setRegion(groupedData)
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <Box
      m={2}
      display='flex'
      flex={1}
      flexDirection='column'
      alignItems='center'
    >
      <Box flex={1} width='100%' style={{ maxWidth: 768 }}>
        <SearchField onChange={onSelectRegion} />
      </Box>
      <List>
        {region.map(item => (
          <ListItem key={item.id}>
            {item.titulo} - {item.incidents.length}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const PromiseEncoder = address => {
  return new Promise((resolve, reject) => {
    openGeocoder()
      .geocode(address)
      .end((err, res) => {
        if (err) {
          reject(new Error(err))
        }
        resolve(res)
      })
  })
}

const SearchField = ({ onChange }) => {
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchEncoder = throttle(() => {
    /* eslint-disable camelcase */
    PromiseEncoder(input)
      .then(response => {
        const list = response
          .filter(item => item.geojson.type === 'Polygon')
          .map(({ place_id, display_name, address, geojson }) => {
            return {
              placeId: place_id,
              displayName: display_name,
              geoJSON: geojson,
              address
            }
          })
        setOptions(list)
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, 300)

  /* eslint-enable camelcase */
  useAsync(fetchEncoder, [input])

  const handleInputChange = event => {
    setLoading(true)
    setInput(event.target.value)
  }

  return (
    <Autocomplete
      style={{ width: '100%' }}
      getOptionLabel={option => option.displayName}
      loading={loading}
      options={options}
      onChange={onChange}
      renderInput={params => {
        return (
          <TextField
            {...params}
            placeholder='Busque por município, cidade ou estado'
            variant='outlined'
            fullWidth
            onChange={handleInputChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )
      }}
      renderOption={option => {
        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOnIcon />
            </Grid>
            <Grid item xs>
              <span style={{ fontWeight: 700 }}>{option.address.city}</span>
              <Typography variant='body2' color='textSecondary'>
                {option.address.state} - {option.address.country}
              </Typography>
            </Grid>
          </Grid>
        )
      }}
    />
  )
}

export default Report
