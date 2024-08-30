import React, { useState } from 'react';
import CarreGallerie from '../carregallerie/CarreGallerie';
import Button from '../buttons/Button';
import { HeaderImages } from '../Header/HeaderImages';
import { SideBar } from '../SideBar/SideBar';
import './mesImages.css'
import ClicDroitMenu from '../clicdroitmenu/ClicDroitMenu';


function MesImages({
    imgs,
    futureImg,
    handleFutureImg,
    handleImg,
    handleCancel,
    handleFutureImgMldc,
    handleExport,
    handleCheckedBox,
    renameImg,
    deleteImg
}) {

    const [menuData, setMenuData] = useState({
        showMenu: false,
        xPos: 0,
        yPos: 0,
        clickedElement: ""
    })

    const listActions = [
        { idAction: "rename", action: "Renommer" },
        { idAction: "delete", action: "Supprimer" },
    ]

    const handleContextMenu = (event) => {
        event.preventDefault();
        // Met le menu au niveau du curseur de la souris
        setMenuData({
            showMenu: true,
            xPos: event.pageX,
            yPos: event.pageY,
            clickedElement: event.target
        })
    };

    // N'affiche plus le menu
    const handleClick = () => {
        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            showMenu: false,
        }))
    };


    const doClicAction = (option) => {
        if (menuData.clickedElement) {
            console.log(`Action choisie : ${option}`);
            console.log('Clicked Element:', menuData.clickedElement.id);
        }
    
        if (option === "rename") {
            console.log(`Renommer l'élément : ${option}`);
            renameImg(menuData.clickedElement.id);  // Appel de la fonction renameImg
        } else if (option === "delete") {
            console.log(`Supprimer l'élément : ${option}`);
            deleteImg(menuData.clickedElement.id);  // Appel de la fonction deleteImg
        }

        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            showMenu: false,
        }));
    };
    
    

    return (
        <div className='container'>
            <div>
                <SideBar />
            </div>
            <div className='containerMesImages'>
                <HeaderImages handleFutureImg={handleFutureImg} handleFutureImgMldc={handleFutureImgMldc} handleExport={handleExport} />
                <div className='containerImage'>
                    <div className='previewDiv'>
                        {/* Ici prévisualisation */}
                        {futureImg && (
                            <div>
                                <h2>Prévisualisation :</h2>
                                <div className='imgAndButtons'>
                                    <img className="futureImg" src={futureImg.srcImg} alt="Prévisualisation" />
                                    <div className='checkBtn'>
                                        <Button nom='OK' fonction={handleImg} />
                                        <Button nom='Annuler' fonction={handleCancel} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div onContextMenu={handleContextMenu} onClick={handleClick}>
                        <ClicDroitMenu
                            xPos={menuData.xPos}
                            yPos={menuData.yPos}
                            showMenu={menuData.showMenu}
                            listActions={listActions}
                            doClicAction={doClicAction}
                        />
                        <div className='stockDiv'>
                            <h2>Images stockées</h2>
                            <div className='imagesStokedDiv'>
                                {imgs.map((img) => (
                                    <div>
                                        <CarreGallerie key={img.id} srcImg={img.srcImg} nom={img.nom} id={img.id} maxWidth='20em' />
                                        <div>
                                            <label htmlFor={img.id}>Exporter ? </label>

                                            {/* () => handleCheckedBox(img.id) et non handleCheckedBox(img.id) pour que la fonction se déclenche 
                                    au changement de la checkbox */}
                                            <input type="checkbox" name={img.id} id={img.id} onChange={handleCheckedBox} />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default MesImages