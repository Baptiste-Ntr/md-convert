import React, { useState, useEffect } from 'react';
import ClicDroitMenu from './Components/clicdroitmenu/ClicDroitMenu';
import MesMarkdowns from './Components/mesmarkdonws/MesMarkdowns';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Blocs } from "./Pages/Blocs"
import { Home } from "./Pages/Home"
import { Images } from "./Pages/Images"
import { Markdowns } from "./Pages/Markdowns"
import { MDProvider } from "./Components/Context/MDContext"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    }, {
      path: '/blocs',
      element: <Blocs />
    }, {
      path: '/images',
      element: <Images />
    }, {
      path: '/markdown',
      element: <Markdowns />
    }
  ])
  const [menuData, setMenuData] = useState({
    showMenu: false,
    xPos: 0,
    yPos: 0,
    clickedElement: ""
  })
  const [contenusRepo, setContenusRepo] = useState([]);


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
          setContenusRepo([...dossiersResult, ...fichiersResult])
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
      console.log('Clicked Element:', menuData.clickedElement);
    }

    if (option === 'add-file') {
      const fileName = prompt("Entrez le nom du nouveau fichier:");
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
          setContenusRepo((prevContenusRepo) => [...prevContenusRepo, newFile]);
        };

        addRequest.onerror = (event) => {
          console.error("Erreur lors de l'ajout du fichier dans IndexedDB", event);
        };

        request.onerror = (event) => {
          console.error("Erreur lors de l'ouverture de la base de données pour ajouter un fichier:", event);
        };
      }
    }

    setMenuData((prevMenuData) => ({
      ...prevMenuData,
      showMenu: false,
    }))
  };


  return (
    <>
      <MDProvider>
        <RouterProvider router={router} />
      </MDProvider>
      <div onContextMenu={handleContextMenu} onClick={handleClick} style={{ height: '100vh' }}>
        <ClicDroitMenu
          xPos={menuData.xPos}
          yPos={menuData.yPos}
          showMenu={menuData.showMenu}
          doClicAction={doClicAction}
        />
        <MesMarkdowns contenusRepo={contenusRepo} ></MesMarkdowns>
      </div>
    </>
  )
}

export default App
