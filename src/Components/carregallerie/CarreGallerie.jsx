import React from 'react'

function CarreGallerie({srcImg, nomDeLaClasse, nom, selectionner}) {
  if (selectionner) {
    console.log("coucou");
  }  

  return (
    <div className={nomDeLaClasse}>
        <img src={srcImg} style={{maxWidth: '100px'} } id={nomDeLaClasse + '_' + crypto.randomUUID()}/>
        <p name="nomElement"> {nom} </p>
    </div>
  )
}

export default CarreGallerie