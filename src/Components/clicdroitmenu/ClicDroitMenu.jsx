import React from 'react';

const ClicDroitMenu = ({ xPos, yPos, showMenu, doClicAction }) => {
  if (!showMenu) return null;

  // Remonte ce qui est cliquer à la fonction doClicAction dans le App.jsx
  function clicAction(e) {
    doClicAction(e.target.id)
  }

  const monstyle = {
    position: 'absolute',
    top: `${yPos}px`,
    left: `${xPos}px`,
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  return (
    <div style={monstyle}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 10 }}>
        <li id="add-file" onClick={clicAction}>Nouveau Fichier</li>
        <li id="add-folder" onClick={clicAction}>Nouveau Dossier</li>
        <li id="rename" onClick={clicAction}>Renommer</li>
        <li id="delete" onClick={clicAction}>Supprimer</li>
      </ul>
    </div>
  );
};

export default ClicDroitMenu;
