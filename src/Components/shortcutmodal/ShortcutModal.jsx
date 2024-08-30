import React, { useState, useEffect } from 'react';

const ShortcutModal = ({ onClose, onSave }) => {
    const [pressedKeys, setPressedKeys] = useState([]);

    useEffect(() => {
        const handleKeydown = (e) => {
            e.preventDefault();
            const key = e.key;
            if (!pressedKeys.includes(key)) {
                setPressedKeys([...pressedKeys, key]);
            }
        };

        const handleKeyup = () => {
            // Nothing to do on keyup here, just prevent keydown from recording more
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [pressedKeys]);

    const handleSave = () => {
        onSave(pressedKeys.join('+'));
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Appuyez sur la combinaison de touches</h2>
                <div className="shortcut-display">
                    {pressedKeys.length > 0 ? pressedKeys.join(' + ') : 'Aucune touche détectée'}
                </div>
                <button onClick={handleSave} disabled={pressedKeys.length === 0}>
                    Confirmer
                </button>
                <button onClick={onClose}>Annuler</button>
            </div>
        </div>
    );
};

export default ShortcutModal;
