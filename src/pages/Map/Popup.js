import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'

const noCar = require('../../assets/icons/no-car.png')
const car = require('../../assets/icons/car.png')
const noWalker = require('../../assets/icons/no-walker.png')
const walker = require('../../assets/icons/walker.png')

function Popup ({ open, onClose, data }) {
  if (!open || !data) {
    return null
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{data.tipo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{data.descricao}</DialogContentText>
        <div>
          <img
            src={data.transitavelAPe ? walker : noWalker}
            alt={
              data.transitavelAPe ? 'transitável a pé' : 'não transitável a pé'
            }
          />
          <img
            src={data.transitavelVeiculo ? car : noCar}
            alt={
              data.transitavelVeiculo
                ? 'transitável por veículos'
                : 'não transitável por veículos'
            }
          />
        </div>
        <div>
          <Button variant='contained' color='primary'>
            Existente
          </Button>
          <Button variant='contained' color='primary'>
            Inexistente
          </Button>
          <Button variant='contained' color='primary'>
            Caso encerrado
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onClose} color='primary'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup
