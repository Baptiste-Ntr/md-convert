import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Box, Grid2 } from '@mui/material';
import ShortcutItem from '../Components/Modal/ShortcutItem'
import { Redaction } from '../Components/convert/Redaction';
import { RenderMD } from '../Components/convert/RenderMD';
import { idb } from '../db/indexedDB';
import { SideBar } from '../Components/SideBar/SideBar';
import "./block.css"

export const Blocs = () => {
    const [shortcuts, setShortcuts] = useState([]);
    const [newShortcutName, setNewShortcutName] = useState('');
    const [newShortcutKeys, setNewShortcutKeys] = useState('');
    const [newContent, setNewContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShortcut, setEditingShortcut] = useState(null);
    const [currentContent, setCurrentContent] = useState('');

    // Charge la data au premier appel de la page
    useEffect(() => {
        const request = indexedDB.open("markdown_repository");

        request.onsuccess = () => {
            const db = request.result;

            const tx = db.transaction("raccourcis", "readonly");
            const raccourcisData = tx.objectStore("raccourcis").getAll();

            raccourcisData.onsuccess = (query) => {
                const raccourcis = query.target.result;
                setShortcuts([...raccourcis]);
            };

            raccourcisData.onerror = (event) => {
                console.error("Erreur lors de la récupération des raccourcis:", event);
            };
        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données:", event);
        };
    }, []); // Le useEffect s'exécute lorsque isComponentReady devient true


    const handleKeyDown = (event, setKeys) => {
        let keyCombination = '';

        if (event.ctrlKey) {
            keyCombination += 'Ctrl+';
        }
        if (event.shiftKey) {
            keyCombination += 'Shift+';
        }
        if (event.altKey) {
            keyCombination += 'Alt+';
        }

        if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt') {
            keyCombination += event.key;
        }

        if (keyCombination.includes('+')) {
            setKeys(keyCombination);
        } else {
            setKeys('');
        }

        event.preventDefault();
    };

    const handleDeleteShortcut = (shortcut) => {
        console.log(shortcut);
        const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer le raccouci " + (shortcut.nom) + " ?");
        if (!isConfirmed) return;

        const request = idb.open("markdown_repository");
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("raccourcis", "readwrite");
            const deleteRequest = tx.objectStore("raccourcis").delete(shortcut.id);
            // Supprime le fichier / dossier

            deleteRequest.onsuccess = () => {
                // Met à jour le contenus local pour l'affichage en temps reel
                setShortcuts(shortcuts.filter(sc => sc.id !== shortcut.id));
            };

            deleteRequest.onerror = (event) => {
                console.error("Erreur lors de la suppression dans IndexedDB", event);
            };

        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données pour renommer un élément:", event);
        };
    };


    const handleAddShortcut = () => {
        const newShortcut = {
            id: crypto.randomUUID(),
            nom: newShortcutName,
            touches: newShortcutKeys,
            contenus: newContent
        };

        const request = idb.open("markdown_repository");

        // Si l'ouverture (connection) c'est bien réalisé alors on commence les transacitons
        request.onsuccess = () => {
            // Recupère la bdd
            const db = request.result;
            const tx = db.transaction(["raccourcis"], "readwrite");
            const raccourcisData = tx.objectStore("raccourcis");

            const addShortcutRequest = raccourcisData.add(newShortcut);

            addShortcutRequest.onsuccess = () => {
                // Mettre à jour l'état pour inclure le nouveau fichier
                setShortcuts([...shortcuts, newShortcut]);
                setNewShortcutName('');
                setNewShortcutKeys('');
                setNewContent('');
            }

            addShortcutRequest.onerror = (event) => {
                console.error("Erreur lors de l'ouverture de la base de données pour ajouter un fichier:", event);
            };
        }
    };

    const handleEditShortcut = (shortcut) => {
        setEditingShortcut(shortcut);
        setCurrentContent(shortcut.contenus);
        setIsModalOpen(true);
    };

    const handleSaveContent = () => {

        const request = idb.open("markdown_repository");
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("raccourcis", "readwrite");
            const store = tx.objectStore("raccourcis");
            const leRaccourci = store.get(editingShortcut.id);
            console.log(editingShortcut);


            leRaccourci.onsuccess = () => {
                var raccouci = leRaccourci.result
                raccouci = {
                    id: raccouci.id,
                    nom: editingShortcut.nom,
                    touches: editingShortcut.touches,
                    contenus: currentContent
                }

                console.log(raccouci);


                const updateRequest = store.put(raccouci);

                updateRequest.onsuccess = () => {
                    setShortcuts(shortcuts.map(sc =>
                        sc.id === editingShortcut.id
                            ? { ...sc, contenus: currentContent, nom: editingShortcut.nom, touches: editingShortcut.touches }
                            : sc
                    ));
                    setIsModalOpen(false);
                    setEditingShortcut(null);
                    setCurrentContent('');
                };

                updateRequest.onerror = (event) => {
                    console.error("Erreur lors de la mise à jour dans IndexedDB", event);
                };
            }

            leRaccourci.onerror = (event) => {
                console.error("Erreur lors de la requette pour trouver le raccouci :", event);
            };
        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données pour renommer un élément:", event);
        };

    };

    return (
        <>
            <div clasName={"container"}>
                <SideBar />
            </div>
            <div clasName={"containerBloc"}>
                <h1>Blocs</h1>
                <TextField
                    label="Nom du raccourci"
                    value={newShortcutName}
                    onChange={(e) => setNewShortcutName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Combinaisons de touche associées (Ctrl, Shift, Alt + une autre touche)"
                    value={newShortcutKeys}
                    onKeyDown={(e) => handleKeyDown(e, setNewShortcutKeys)}
                    fullWidth
                    margin="normal"
                />
                <Redaction
                    redacValue={setNewContent}
                    initialValue={newContent}
                />
                <RenderMD value={newContent} />
                <Button
                    variant="contained"
                    onClick={handleAddShortcut}
                    disabled={!newShortcutName || !newShortcutKeys || !newContent}
                    style={{ marginTop: '10px' }}
                >
                    Créer le raccourci
                </Button>
            </div>
            <div>
                {shortcuts.map((shortcut) => (
                    <div key={shortcut.id}>
                        <ShortcutItem
                            shortcut={shortcut}
                            onEdit={() => handleEditShortcut(shortcut)}
                            onDelete={() => handleDeleteShortcut(shortcut)}
                        />
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box style={{ padding: '20px', backgroundColor: 'white', margin: '10% auto', maxWidth: '600px' }}>
                        <h2>Modifier le contenu du raccourci</h2>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} md={6}>
                                <TextField
                                    label="Nom du raccourci"
                                    value={editingShortcut.nom}
                                    onChange={(e) => setEditingShortcut({ ...editingShortcut, nom: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Touches associées"
                                    value={editingShortcut.touches}
                                    onKeyDown={(e) => handleKeyDown(e, (touches) => setEditingShortcut({ ...editingShortcut, touches }))}
                                    fullWidth
                                />
                            </Grid2>
                            <Grid2 item xs={12} md={6}>
                                <Redaction
                                    redacValue={setCurrentContent}
                                    initialValue={currentContent}
                                />
                            </Grid2>
                            <Grid2 item xs={12} md={6}>
                                <RenderMD value={currentContent} />
                            </Grid2>
                        </Grid2>
                        <Button variant="contained" onClick={handleSaveContent} style={{ marginTop: '10px' }}>
                            Enregistrer
                        </Button>
                    </Box>
                </Modal>
            )}
        </>
    );
};
