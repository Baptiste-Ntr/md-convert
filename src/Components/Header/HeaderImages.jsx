import { Grid2, ListItemButton } from "@mui/material"
import './HeaderImages.css'

export const HeaderImages = ({handleFutureImg}) => {
    return (
        <>
            <h1>Mes Images</h1>
            <div className="inputFileDiv">
                <label htmlFor="file">Ajouter une image</label>
                <input id="file" type="file" accept="image/*" onChange={handleFutureImg} />
            </div>
        </>
    )
}