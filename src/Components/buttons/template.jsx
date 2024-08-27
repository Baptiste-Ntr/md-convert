import React from 'react'
import Button from '@mui/material/Button';

function Template({name, fonction}) {
  return (
    <Button variant="contained" onClick={fonction}>{name}</Button>
  )
}

export default Template