import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const ShortcutModal = ({ shortcut, onSave, onClose }) => {
    const [name, setName] = useState(shortcut.name);
    const [keys, setKeys] = useState(shortcut.keys);
    const [content, setContent] = useState(shortcut.content);

    const handleKeyDown = (event) => {
        const keyCombination = `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`;
        setKeys(keyCombination);
        event.preventDefault();
    };

    const handleSave = () => {
        const updatedShortcut = {
            ...shortcut,
            name,
            keys,
            content
        };
        onSave(updatedShortcut);
    };

    return (
        <Box style={{ padding: '20px', background: 'white', margin: '100px auto', maxWidth: '600px' }}>
            <h2>Modifier le raccourci</h2>
            <TextField
                label="Nom du raccourci"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Touches associées"
                value={keys}
                onKeyDown={handleKeyDown}
                onChange={(e) => setKeys(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Contenu du bloc"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={6}
                fullWidth
                margin="normal"
            />
            <div style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Enregistrer
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
                    Annuler
                </Button>
            </div>
        </Box>
    );
};

export default ShortcutModal;
