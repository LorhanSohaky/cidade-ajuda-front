import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'

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
          Transitavel a pé: {data.transitavelAPe ? 'Sim' : 'Não'}
          Transitavel veículo: {data.transitavelVeiculo ? 'Sim' : 'Não'}
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
