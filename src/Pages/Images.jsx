import { useEffect, useState } from "react";
import MesImages from "../Components/mesImages/MesImages";

export const Images = () => {
    const [imgs, setImgs] = useState([]);
    const [futureImg, setFutureImg] = useState();

    useEffect(() => {
        const request = indexedDB.open("markdown_repository");
        request.onsuccess = () => {
            // Recupère la bdd
            const db = request.result;
        
            // Récupérer les dossiers avec 'emplacement: 0' & les fichiers avec 'idDossier: 0'
            const tx = db.transaction(["images"], "readonly");

            // On vas effectuer un rechercher sur l'index emplacement et idDossier (voir src/db/indexedDB)
            const imageData = tx.objectStore("images")

            // Revient à faire un SELECT * FROM images
            const imagesRequest = imageData.getAll();

            // Si la requette à réussi
            imagesRequest.onsuccess = (query) => {
                 // Récupère le résultat de la requette
                 const imageResult = query.target.result;
                 // setImgs dans imgs les images
                 setImgs([...imageResult])
            }

            imagesRequest.onerror = (event) => {
                console.error("Erreur lors de la récupération des images:", event);
            };
        }
    },[])

    function handleFutureImg (e) {
        const file = e.target.files[0];

        if (file) {
            // Pour lire un fichier (image dans notre cas)
            const reader = new FileReader();

            // Lit de fichier et le converti en Base64
            reader.readAsDataURL(file);
            
            // Initialise l'event de fin de lecture du fichier
            reader.onloadend = () => {
                // Quand le fichier est lu, on set 
                const image = { id : crypto.randomUUID(), srcImg : reader.result, nom : file.name }
                setFutureImg(image);
            };
        }
    }

    function handleImg (e) {
        if (futureImg) {
            const request = indexedDB.open("markdown_repository");
            request.onsuccess = () => {
                // Recupère la bdd
                const db = request.result;
                
                var tx = db.transaction(['images'], "readwrite");
                const imagesStore = tx.objectStore("images");

                const addRequest = imagesStore.add(futureImg);

                addRequest.onsuccess = () => {
                    setImgs(
                        // Array donc on utilise le spread operator et recréer un autre array (avec la nouller image)
                        // pour rerender le component 
                        prevImgs => [...prevImgs, futureImg]
                    );
                    setFutureImg(null)
                };

                addRequest.onerror = (event) => {
                    console.error("Erreur lors de l'ajout de l'image dans IndexedDB", event);
                };

            }
        }
    };

    function handleCancel (e) {
        setFutureImg(null)
    }

    return (
        <>
            <MesImages 
                imgs={imgs} 
                futureImg={futureImg} 
                handleFutureImg={handleFutureImg} 
                handleImg={handleImg} 
                handleCancel={handleCancel}

            />
        </>
    )
}