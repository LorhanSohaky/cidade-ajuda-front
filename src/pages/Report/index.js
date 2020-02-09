import React, { useState } from 'react'

import { Box, TextField, Grid, Typography } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { useAsync } from 'react-async-hook'
import throttle from 'lodash/throttle'
import openGeocoder from 'node-open-geocoder'

const Report = () => {
  return (
    <Box
      m={2}
      display='flex'
      flex={1}
      flexDirection='column'
      alignItems='center'
    >
      <Box flex={1} width='100%' style={{ maxWidth: 768 }}>
        <SearchField />
      </Box>
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

const SearchField = () => {
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')

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
  }, 300)

  /* eslint-enable camelcase */
  useAsync(fetchEncoder, [input])

  const handleChange = event => {
    setInput(event.target.value)
  }

  return (
    <Autocomplete
      style={{ width: '100%' }}
      getOptionLabel={option => option.displayName}
      options={options}
      freeSolo
      renderInput={params => (
        <TextField
          {...params}
          placeholder='Busque por município, cidade ou estado'
          variant='outlined'
          fullWidth
          onChange={handleChange}
        />
      )}
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
