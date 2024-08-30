import React, { useState, useContext } from 'react';
import { Button, TextField, Grid2, Modal, Box  } from '@mui/material';
import { MarkdownWrite } from '../Components/convert/MarkdownWrite';
import { MDContext } from "../Components/Context/MDContext";

export const Blocs = () => {
    const [shortcutName, setShortcutName] = useState('');
    const [shortcutKeys, setShortcutKeys] = useState([]);
    const [shortcuts, setShortcuts] = useState([]);
    const [selectedShortcut, setSelectedShortcut] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { setMDFile, mdFile } = useContext(MDContext);

    const handleShortcutNameChange = (event) => {
        setShortcutName(event.target.value);
    };

    const handleShortcutKeyChange = (event) => {
        event.preventDefault();
        const key = event.key;

        if (['Shift', 'Control', 'Alt', 'Meta'].includes(key) && shortcutKeys.includes(key)) {
            return;
        }

        if (!shortcutKeys.includes(key)) {
            setShortcutKeys((prevKeys) => [...prevKeys, key]);
        }
    };

    const handleSaveShortcut = () => {  
        console.log(mdFile);
        
        const newShortcut = {
            id: Date.now(),
            name: shortcutName,
            key: shortcutKeys.join('+'),
            content: mdFile,
        };
        console.log(newShortcut);
        
        setShortcuts([...shortcuts, newShortcut]);
        setShortcutName('');
        setShortcutKeys([]);
        setMDFile('');
    };

    const handleClearShortcutKeys = () => {
        setShortcutKeys([]);
    };

    const handleEditShortcut = (shortcut) => {
        setShortcutName(shortcut.name);
        setShortcutKeys(shortcut.key.split('+'));
        console.log(shortcut);
        
        setMDFile(shortcut.content);
        setSelectedShortcut(shortcut);
        setIsModalOpen(true);
    };

    const handleSaveEditedShortcut = () => {
        const updatedShortcuts = shortcuts.map((sc) =>
            sc.id === selectedShortcut.id
                ? { ...sc, name: shortcutName, key: shortcutKeys.join('+'), content: mdFile }
                : sc
        );
        setShortcuts(updatedShortcuts);
        setIsModalOpen(false);
        setShortcutName('');
        setShortcutKeys([]);
        // setImportedFile('');
        setMDFile('');
    };

    const handleDeleteShortcut = (shortcutId) => {
        const updatedShortcuts = shortcuts.filter((sc) => sc.id !== shortcutId);
        setShortcuts(updatedShortcuts);
    };

    return (
        <>
            <h1>Blocs</h1>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12}>
                    <TextField
                        label="Nom du raccourci"
                        value={shortcutName}
                        onChange={handleShortcutNameChange}
                        fullWidth
                    />
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField
                        label="Saisissez le raccourci"
                        value={shortcutKeys.join('+')}
                        onKeyDown={handleShortcutKeyChange}
                        onKeyUp={(e) => e.preventDefault()}
                        fullWidth
                    />
                    <Button onClick={handleClearShortcutKeys} variant="outlined" color="secondary" style={{ marginTop: '10px' }}>
                        Effacer le raccourci
                    </Button>
                </Grid2>
                <Grid2 item xs={12}>
                    <MarkdownWrite />
                </Grid2>
                <Grid2 item xs={12}>
                    <Button onClick={selectedShortcut ? handleSaveEditedShortcut : handleSaveShortcut} variant="contained" color="primary">
                        {selectedShortcut ? 'Enregistrer les modifications' : 'Enregistrer le raccourci'}
                    </Button>
                </Grid2>
            </Grid2>
            <h2>Raccourcis enregistrés</h2>
            <ul>
                {shortcuts.map((shortcut) => (
                    <li key={shortcut.id}>
                        <strong>{shortcut.name}</strong> ({shortcut.key})
                        <Button onClick={() => handleEditShortcut(shortcut)} variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
                            Modifier
                        </Button>
                        <Button onClick={() => handleDeleteShortcut(shortcut.id)} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                            Supprimer
                        </Button>
                    </li>
                ))}
            </ul>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>Modifier le contenu du raccourci</h2>
                    <MarkdownWrite />
                    <Button onClick={handleSaveEditedShortcut} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                        Enregistrer
                    </Button>
                </Box>
            </Modal>
        </>
    );

};
