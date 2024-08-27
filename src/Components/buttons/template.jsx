import React from 'react'

function Template({name, fonction}) {
  return (
    <button type="button" onClick={fonction}>{name}</button>
  )
}

export default Template