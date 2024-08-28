import { useDrag } from "react-dnd";

function CarreGallerie({ srcImg, nomDeLaClasse, nom, selectionner, isDragging, text }) {
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
    <div className={nomDeLaClasse} ref={dragRef} style={{ opacity }}>
      <img src={srcImg} style={{ maxWidth: '100px' }} id={nomDeLaClasse + '_' + crypto.randomUUID()} />
      <p name="nomElement"> {nom} </p>
    </div>
  )
}

export default CarreGallerie