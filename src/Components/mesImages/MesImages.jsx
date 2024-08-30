import React, { useState } from 'react';
import CarreGallerie from '../carregallerie/CarreGallerie';
import Button from '../buttons/Button';
import { HeaderImages } from '../Header/HeaderImages';
import { SideBar } from '../SideBar/SideBar';
import './mesImages.css'


function MesImages({
  imgs, 
  futureImg, 
  handleFutureImg, 
  handleImg, 
  handleCancel,
  handleFutureImgMldc,
  handleExport,
  handleCheckedBox
}) {

  return (
    <div className='container'>
        <div>
            <SideBar/>
        </div>
        <div className='containerMesImages'>
            <HeaderImages handleFutureImg={handleFutureImg} handleFutureImgMldc={handleFutureImgMldc} handleExport={handleExport}/>
            <div  className='containerImage'>
                <div className='previewDiv'>
                    {/* Ici prévisualisation */}
                    {futureImg && (
                    <div>
                        <h2>Prévisualisation :</h2>
                        <div className='imgAndButtons'>
                            <img className="futureImg" src={futureImg.srcImg} alt="Prévisualisation" />
                            <div className='checkBtn'>
                                <Button nom='OK' fonction={handleImg}/>
                                <Button nom='Annuler' fonction={handleCancel}/>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='stockDiv'>
                    <h2>Images stockées</h2>
                    <div className='imagesStokedDiv'>
                        {imgs.map((img) => (
                            <div>
                                <CarreGallerie key={img.id} srcImg={img.srcImg} nom={img.nom} maxWidth='20em'/>
                                <div>
                                    <label htmlFor={img.id}>Exporter ? </label>

                                    {/* () => handleCheckedBox(img.id) et non handleCheckedBox(img.id) pour que la fonction se déclenche 
                                    au changement de la checkbox */}
                                    <input type="checkbox" name={img.id} id={img.id} onChange={handleCheckedBox}/>
                                </div>
                              
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  )
}

export default MesImages