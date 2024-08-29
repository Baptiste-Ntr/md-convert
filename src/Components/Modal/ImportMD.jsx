import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import propTypes from "prop-types"
import { useContext, useState } from "react"
import { MDContext } from "../Context/MDContext"
import { idb } from "../../db/indexedDB"

export const ImportMD = ({ title }) => {

    const [modal, setModal] = useState({
        open: false
    })

    const { setImportedFile } = useContext(MDContext)

    const insertIntoIndexedDB = (fileContent, fileName) => {
        const request = idb.open("markdown_repository")

        // Si l'ouverture (connection) c'est bien réalisé alors on commence les transacitons
        request.onsuccess = () => {
            // Recupère la bdd
            const db = request.result;
            const tx = db.transaction(["dossiers"], "readwrite");
            const dossierData = tx.objectStore("dossiers");
            const dossierRacine = dossierData.index('id').get(0);

            dossierRacine.onsuccess = () => {
                const newFile = {
                    id: crypto.randomUUID(),
                    nom: fileName,
                    nomDeLaClasse: "fichier",
                    idDossier: 0,
                    contenu: fileContent,
                };
    
                const dossier = dossierRacine.result
                dossier.fichiers.push(newFile)

                const updateDossierRequest = dossierData.put(dossier);

                updateDossierRequest.onerror = (event) => {
                    console.error("Erreur lors de la mise à jour du dossier dans IndexedDB", event);
                };

            }

            request.onerror = (event) => {
                console.error("Erreur lors de l'ouverture de la base de données pour ajouter un fichier:", event);
            };
        }
    }

    return (
        <>
            <Button variant="outlined" onClick={() => setModal({ open: true })}>
                Import MD
            </Button>
            <Dialog
                open={modal.open}
                onClose={() => setModal({ open: false })}
                PaperProps={{
                    component: "form",
                    onSubmit: ((e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const file = formData.get("file")
                        const reader = new FileReader()
                        reader.onload = () => {
                            console.log(reader.result)
                            setImportedFile(reader.result)
                            insertIntoIndexedDB(reader.result, file.name)
                        }
                        reader.readAsText(file)
                    })
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <input type="file" name="file" accept=".md" />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

ImportMD.propTypes = {
    title: propTypes.string.isRequired
}