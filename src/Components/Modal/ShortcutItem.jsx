import React from 'react';
import { Button, Box } from '@mui/material';

const ShortcutItem = ({ shortcut, onEdit, onDelete }) => {
    return (
        <Box style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
            <div><strong>Nom :</strong> {shortcut.nom}</div>
            <div><strong>Touches :</strong> {shortcut.touches}</div>
            <Button variant="outlined" onClick={onEdit} style={{ marginTop: '10px' }}>
                Modifier
            </Button>
            <Button variant="contained" color="secondary" style={{ marginLeft: '10px', marginTop: '10px' }} onClick={onDelete}>
                        Supprimer
                    </Button>
        </Box>
    );
};

export default ShortcutItem;
