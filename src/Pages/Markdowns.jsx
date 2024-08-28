import { useEffect, useState } from "react";
import MesMarkdowns from "../Components/mesmarkdonws/MesMarkdowns"
import ClicDroitMenu from "../Components/clicdroitmenu/ClicDroitMenu";
import { HeaderMarkdowns } from "../Components/Header/HeaderMarkdowns";
import { Link } from "react-router-dom";
import { SideBar } from "../Components/SideBar/SideBar";
import { MDProvider } from "../Components/Context/MDContext";
import { Grid2 } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Markdowns = () => {
    const [contenusRepo, setContenusRepo] = useState([]);

    const [menuData, setMenuData] = useState({
        showMenu: false,
        xPos: 0,
        yPos: 0,
        clickedElement: ""
    })

    const sortContenusRepo = (contenus) => {
        return contenus.sort((a, b) => {
            // Trier d'abord par type : "dossier" avant "fichier"
            if (a.nomDeLaClasse === "dossier" && b.nomDeLaClasse !== "dossier") {
                return -1;
            }
            if (a.nomDeLaClasse !== "dossier" && b.nomDeLaClasse === "dossier") {
                return 1;
            }
            // Si les deux sont du même type, trier par nom (nomDossier ou nom)
            const nameA = a.nom || a.nomDossier;

            const nameB = b.nom || b.nomDossier;
            return nameA.localeCompare(nameB);
        });
    };


    useEffect(() => {
        // On ouvre l'indexedDB pour commencer des transactions dessus
        const request = indexedDB.open("markdown_repository");

        // Si l'ouverture (connection) c'est bien réalisé alors on commence les transacitons
        request.onsuccess = () => {
            // Recupère la bdd
            const db = request.result;

            // Récupérer les dossiers avec 'emplacement: 0' & les fichiers avec 'idDossier: 0'
            const tx = db.transaction(["dossiers", "fichiers"], "readonly");
            // On vas effectuer un rechercher sur l'index emplacement et idDossier (voir src/db/indexedDB)
            const dossierData = tx.objectStore("dossiers").index("emplacement");
            const fichiersData = tx.objectStore("fichiers").index("idDossier");

            // On lance la recherche sur ces index
            // Revient à faire un SELECT * FROM dossiers WHERE emplacement = 0 
            const dossiersRequest = dossierData.getAll(0);
            // Revient à faire un SELECT * FROM fichiers WHERE idDossier = 0 
            const fichiersRequest = fichiersData.getAll(0);

            // Si la requette à réussi
            dossiersRequest.onsuccess = (query) => {
                // Récupère le résultat de la requette
                const dossiersResult = query.target.result;

                // Si la requette à réussi
                fichiersRequest.onsuccess = (query) => {
                    // Récupère le résultat de la requette
                    const fichiersResult = query.target.result;
                    // Combine le resultats de la recherche sur dossiers et fichiers dans contenusRepo

                    setContenusRepo(sortContenusRepo([...dossiersResult, ...fichiersResult]))
                };

                fichiersRequest.onerror = (event) => {
                    console.error("Erreur lors de la récupération des fichiers:", event);
                };
            };

            dossiersRequest.onerror = (event) => {
                console.error("Erreur lors de la récupération des dossiers:", event);
            };
        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données:", event);
        };

    }, []);


    const handleContextMenu = (event) => {
        event.preventDefault();
        // Met le menu au niveau du curseur de la souris
        setMenuData({
            showMenu: true,
            xPos: event.pageX,
            yPos: event.pageY,
            clickedElement: event.target
        })
    };

    // N'affiche plus le menu
    const handleClick = () => {
        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            showMenu: false,
        }))
    };

    // Fait quelque chose au clic sur l'un des elements du menu
    const doClicAction = (option) => {
        // On affiche ce qui est cliquer
        if (menuData.clickedElement) {
            console.log(`coucou : ${option}`);
            console.log('Clicked Element:', menuData.clickedElement.id);
        }

        if (option === 'add-file') {
            const fileName = prompt("Entrez le nom du nouveau fichier:");

            if (fileName === null) {
                return
            }
            const newFile = {
                id: crypto.randomUUID(),
                nom: fileName,
                nomDeLaClasse: "fichier",
                idDossier: 0 // Vous pouvez ajuster cela en fonction du dossier sélectionné
            };
            const request = indexedDB.open("markdown_repository");

            // Si l'ouverture (connection) c'est bien réalisé alors on commence les transacitons
            request.onsuccess = () => {
                // Recupère la bdd
                const db = request.result;
                const tx = db.transaction("fichiers", "readwrite");
                const fichierData = tx.objectStore("fichiers");

                // Ajouter le nouveau fichier dans la base de données
                const addRequest = fichierData.add(newFile);

                addRequest.onsuccess = () => {
                    // Mettre à jour l'état pour inclure le nouveau fichier
                    setContenusRepo((prevContenusRepo) => sortContenusRepo([...prevContenusRepo, newFile]));
                };

                addRequest.onerror = (event) => {
                    console.error("Erreur lors de l'ajout du fichier dans IndexedDB", event);
                };

                request.onerror = (event) => {
                    console.error("Erreur lors de l'ouverture de la base de données pour ajouter un fichier:", event);
                };
            }
        }

        if (option === 'add-folder') {
            const folderName = prompt("Entrez le nom du nouveau dossier:");

            if (folderName === null) {
                return
            }
            const newFolder = {
                id: crypto.randomUUID(),
                nomDossier: folderName,
                nomDeLaClasse: "dossier",
                emplacement: 0 // Vous pouvez ajuster cela en fonction du dossier sélectionné
            };
            const request = indexedDB.open("markdown_repository");

            // Si l'ouverture (connection) c'est bien réalisé alors on commence les transacitons
            request.onsuccess = () => {
                // Recupère la bdd
                const db = request.result;
                const tx = db.transaction("dossiers", "readwrite");
                const dossierData = tx.objectStore("dossiers");

                // Ajouter le nouveau fichier dans la base de données
                const addRequest = dossierData.add(newFolder);

                addRequest.onsuccess = () => {
                    // Mettre à jour l'état pour inclure le nouveau fichier
                    setContenusRepo((prevContenusRepo) => sortContenusRepo([newFolder, ...prevContenusRepo]));
                };

                addRequest.onerror = (event) => {
                    console.error("Erreur lors de l'ajout du fichier dans IndexedDB", event);
                };

                request.onerror = (event) => {
                    console.error("Erreur lors de l'ouverture de la base de données pour ajouter un fichier:", event);
                };
            }
        }

        if (option === 'rename' && (menuData.clickedElement.className === "fichier" || menuData.clickedElement.className === "dossier")) {
            const id = menuData.clickedElement.id;
            const newName = prompt("Entrez le nouveau nom:");
            if (newName === null) return;

            const request = indexedDB.open("markdown_repository");
            request.onsuccess = () => {
                const db = request.result;
                var store;

                // Determine if it's a file or a folder
                const element = contenusRepo.find(el => el.id === id);
                if (element.nomDeLaClasse === "fichier") {
                    const tx = db.transaction("fichiers", "readwrite");
                    store = tx.objectStore("fichiers");
                    element.nom = newName;
                } else {
                    const tx = db.transaction("dossiers", "readwrite");
                    store = tx.objectStore("dossiers");
                    element.nomDossier = newName;
                }

                const updateRequest = store.put(element);

                // ia
                updateRequest.onsuccess = () => {
                    // Update the state to reflect the new name
                    setContenusRepo((prevContenusRepo) => sortContenusRepo(
                        prevContenusRepo.map(el => (el.id === id ? element : el))
                    ));
                };

                updateRequest.onerror = (event) => {
                    console.error("Erreur lors de la mise à jour dans IndexedDB", event);
                };
            };

            request.onerror = (event) => {
                console.error("Erreur lors de l'ouverture de la base de données pour renommer un élément:", event);
            };
        }

        if (option === 'delete' && (menuData.clickedElement.className === "fichier" || menuData.clickedElement.className === "dossier")) {
            const id = menuData.clickedElement.id;
            const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce " + (menuData.clickedElement.className === "fichier" ? "fichier" : "dossier") + " ?");
            if (!isConfirmed) return;

            const request = indexedDB.open("markdown_repository");
            request.onsuccess = () => {
                const db = request.result;
                var store;

                // Determine if it's a file or a folder
                const element = contenusRepo.find(el => el.id === id);
                if (element.nomDeLaClasse === "fichier") {
                    const tx = db.transaction("fichiers", "readwrite");
                    store = tx.objectStore("fichiers");
                } else {
                    const tx = db.transaction("dossiers", "readwrite");
                    store = tx.objectStore("dossiers");
                }

                // Delete the entry from IndexedDB
                const deleteRequest = store.delete(id);

                deleteRequest.onsuccess = () => {
                    // Update the state to remove the deleted element
                    setContenusRepo((prevContenusRepo) =>
                        prevContenusRepo.filter(el => el.id !== id)
                    );
                };

                deleteRequest.onerror = (event) => {
                    console.error("Erreur lors de la suppression dans IndexedDB", event);
                };

            };

            request.onerror = (event) => {
                console.error("Erreur lors de l'ouverture de la base de données pour renommer un élément:", event);
            };
        }

        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            showMenu: false,
        }))
    };

    const linksList = [
        <Link to="/blocs" key={2}>Blocs</Link>,
        <Link to="/images" key={3}>Images</Link>,
        <Link to="/markdown" key={4}>Markdown</Link>,
    ]

    const listActions = [
        { idAction: "add-file", action: "Nouveau Fichier" },
        { idAction: "add-folder", action: "Nouveau Dossier" },
        { idAction: "rename", action: "Renommer" },
        { idAction: "delete", action: "Supprimer" }
    ]

    return (
        <DndProvider backend={HTML5Backend}>
            <MDProvider>
                <HeaderMarkdowns />
                <Grid2 container height={"80vh"} padding={"10px"} spacing={3} onContextMenu={handleContextMenu} onClick={handleClick}>
                    <ClicDroitMenu
                        xPos={menuData.xPos}
                        yPos={menuData.yPos}
                        showMenu={menuData.showMenu}
                        listActions={listActions}
                        doClicAction={doClicAction}
                    />
                    <SideBar linksList={linksList} />
                    <MesMarkdowns contenusRepo={contenusRepo} ></MesMarkdowns>
                </Grid2>
            </MDProvider>
        </DndProvider>
    )
}