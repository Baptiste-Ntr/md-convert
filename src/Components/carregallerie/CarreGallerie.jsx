

function CarreGallerie({srcImg, id, nom, selectionner, maxWidth, styleCustom}) {
  if (selectionner) {
    console.log("coucou");
  }


  return (
    <div style={{styleCustom}}>
        <img src={srcImg} style={{ maxWidth: maxWidth ? maxWidth : '100px' }}  id={id}/>
        <p name="nomElement"> {nom} </p>
    </div>
  )
}

export default CarreGallerie