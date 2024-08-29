import React, { useState } from 'react';
import CarreGallerie from '../carregallerie/CarreGallerie';
import Button from '../buttons/Button';


function MesImages({
  imgs, 
  futureImg, 
  handleFutureImg, 
  handleImg, 
  handleCancel
}) {

  return (
    <div>
        <h1>Mes Images</h1>

       <div>
        <input type="file" accept="image/*" onChange={handleFutureImg} />
        
        {/* Ici prévisualisation */}
          {futureImg && (
            <div>
              <h3>Prévisualisation :</h3>
              <img src={futureImg.srcImg} alt="Prévisualisation" style={{ width: '200px', height: 'auto' }} />
              <div>
                <button onClick={handleImg}>OK</button>
                <button onClick={handleCancel}>Annuler</button>
              </div>
            </div>
          )}

      </div>
      <div>
        <h2>Images stockées</h2>
        {imgs.map((img) => (
          <>
            <CarreGallerie key={img.id} srcImg={img.srcImg} nom={img.nom} />
          </>
        ))}
      </div>

    </div>
    

  )
}

export default MesImages