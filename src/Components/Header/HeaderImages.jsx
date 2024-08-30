import {Grid2, ListItemButton } from "@mui/material"
import Button from "../buttons/Button"
import './HeaderImages.css'

export const HeaderImages = ({handleFutureImg, handleFutureImgMldc, handleExport}) => {
    return (
        <>
            <h1>Mes Images</h1>
            <div className="containerHeaderButton">
                <div >
                    <div className="inputFileDiv">
                        <label htmlFor="file">Ajouter une image en format standard</label>
                        <input id="file" type="file" accept="image/*" onChange={handleFutureImg} />
                    </div>
                    <div className="inputFileDiv">
                        <label htmlFor="file">Ajouter une/des images en format .img.mdlc</label>
                        <input id="file" type="file" accept="*" onChange={handleFutureImgMldc}/>
                    </div>
                </div>
                <div>
                    <p>Exporter une/des image(s) au format .img.mldc</p>
                    <Button nom="Exporter" fonction={handleExport}/>
                </div>
            </div>
            
            
        </>
    )
}