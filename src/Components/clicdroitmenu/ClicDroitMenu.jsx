import React from 'react';

const ClicDroitMenu = ({ xPos, yPos, showMenu, listActions, doClicAction }) => {
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
        {listActions.map(({idAction, action}) => (
          <li id={idAction} onClick={clicAction}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClicDroitMenu;
