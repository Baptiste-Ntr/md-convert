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
  handleCancel
}) {

  return (
    <div className='container'>
        <div>
            <SideBar/>
        </div>
        <div className='containerMesImages'>
            <HeaderImages handleFutureImg={handleFutureImg}/>
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
                            <>
                                <CarreGallerie key={img.id} srcImg={img.srcImg} nom={img.nom} maxWidth='20em'/>
                            </>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
        
       

    </div>
    

  )
}

export default MesImages