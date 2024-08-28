import { useDrag } from "react-dnd";

function CarreGallerie({ srcImg, nomDeLaClasse, nom, selectionner, isDragging, text, idElement }) {
  if (selectionner) {
    console.log("coucou");
  }

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'carreGallerie',
      item: { nomDeLaClasse, nom, srcImg },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    })
  )

  return (
    <div className={nomDeLaClasse} ref={dragRef} style={{ opacity, zIndex: 800, }}>
      <img src={srcImg} style={{ maxWidth: '100px' }} id={idElement} className={nomDeLaClasse} />
      <p name="nomElement" className={nomDeLaClasse}> {nom} </p>
    </div>
  )
}

export default CarreGallerie