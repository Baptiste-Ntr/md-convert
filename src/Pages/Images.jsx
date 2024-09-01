import { useEffect, useState } from "react";
import MesImages from "../Components/mesImages/MesImages";

export const Images = () => {
    const [imgs, setImgs] = useState([]);
    const [futureImg, setFutureImg] = useState();
    const [checkedImgs, SetCheckedImgs] = useState([]);

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
    }, [])

    function handleFutureImg(e) {
        const file = e.target.files[0];

        if (file) {
            // Pour lire un fichier (image dans notre cas)
            const reader = new FileReader();

            // Lit de fichier et le converti en Base64
            reader.readAsDataURL(file);

            // Initialise l'event de fin de lecture du fichier
            reader.onloadend = () => {
                // Quand le fichier est lu, on set 
                const image = { id: crypto.randomUUID(), srcImg: reader.result, nom: file.name }
                setFutureImg(image);
            };
        }
    }

    function handleImg(e) {
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

    function handleCancel(e) {
        setFutureImg(null)
    }

    function handleFutureImgMldc(e) {
        const fichier = e.target.files[0];

        if (fichier) {
            const reader = new FileReader();

            // Lit le fichier
            reader.readAsText(fichier);

            reader.onload = (event) => {
                // Stocker le content
                let fileContent = event.target.result;

                // Parse le content
                const parsedData = JSON.parse(fileContent);
                // Partie DB ***************************************************************************************
                const request = indexedDB.open("markdown_repository");
                request.onsuccess = () => {
                    const db = request.result;
                    var tx = db.transaction(['images'], "readwrite");
                    const imagesStore = tx.objectStore("images");

                    parsedData.forEach(img => {
                        const addRequest = imagesStore.add(img);

                        // Partie state ***************************************************************************************
                        addRequest.onsuccess = () => {
                            setImgs(
                                // Array donc on utilise le spread operator et recréer un autre array (avec la nouveller image)
                                // pour rerender le component 
                                prevImgs => [...prevImgs, img]
                            );
                        };

                        addRequest.onerror = (event) => {
                            console.error("Erreur lors de l'ajout de l'image dans IndexedDB", event);
                        };
                    });
                }
            }
        }
    }

    function handleExport(e) {

        const pickupImgs = imgs.filter((img) =>
            checkedImgs.some((checkedImg) => img.id === checkedImg)
        );

        const futureExportedImgs = pickupImgs.map((img) => ({ nom: img.nom, srcImg: img.srcImg, }))
        const extension = futureExportedImgs.length === 1 ? '.img.mdlc' : '.imgs.mdlc'

        let nomFichier = futureExportedImgs.length === 1 ? futureExportedImgs[0].nom : `Liste_${futureExportedImgs[0].nom}`

        if (nomFichier !== 'Liste_d_images') {
            const parties = nomFichier.split('.');
            nomFichier = parties.slice(0, -1).join('.');
        }

        // Créer un Blob (Binary Large Object) 
        const imgBlob = new Blob([JSON.stringify(futureExportedImgs, null, 2)], { type: 'application/json' });
        // Créer une url
        const imgUrl = URL.createObjectURL(imgBlob);
        // Créer un element de DOM a
        const imgLink = document.createElement('a');
        // Définir le href de a
        imgLink.href = imgUrl;
        // Définir le nom du fichier
        imgLink.download = `${nomFichier}${extension}`;
        // Déclencher le téléchargement
        imgLink.click();
        // Supprimer l'url crée en amont
        URL.revokeObjectURL(imgUrl);

    }

    function handleCheckedBox(e) {
        const checked = e.target.checked
        const imgId = e.target.id;

        // Récuperer les checkbox cochées
        if (checked) {
            SetCheckedImgs(
                prevImgs => [...prevImgs, imgId]
            )
            // Supprimer du state checkedImg les checkbox plus cochées
        } else if (checkedImgs.length !== 0 && !checked) {
            SetCheckedImgs(
                prevImgs => prevImgs.filter(img => img !== imgId)
            )
        }
    }

    function renameImg(id) {
        console.log("hello");

        const newName = prompt("Entrez le nouveau nom:");
        if (newName === null) return;

        const request = indexedDB.open("markdown_repository");
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("images", "readwrite");
            const store = tx.objectStore("images");
            const getRequest = store.get(id);  // Utiliser l'id passé en paramètre

            getRequest.onsuccess = () => {
                const image = getRequest.result;
                console.log(image);

                const renameImage = {
                    ...image,
                    nom: newName,
                };
                console.log(renameImage);
                const updateRequest = store.put(renameImage);

                updateRequest.onsuccess = () => {
                    // Mise à jour réussie, mettre à jour l'état imgs pour refléter la modification
                    setImgs((prevImgs) =>
                        prevImgs.map((img) => (img.id === renameImage.id ? renameImage : img))
                    );
                };

                updateRequest.onerror = (event) => {
                    console.error("Erreur lors de la mise à jour dans IndexedDB", event);
                };
            };
        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données pour renommer un élément:", event);
        };
    }

    function deleteImg(id) {
        const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
        if (!isConfirmed) return;
    
        const request = indexedDB.open("markdown_repository");
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("images", "readwrite");
            const store = tx.objectStore("images");
    
            const deleteRequest = store.delete(id);
    
            deleteRequest.onsuccess = () => {
                // Mise à jour réussie, mettre à jour l'état imgs pour refléter la suppression
                setImgs((prevImgs) => prevImgs.filter((img) => img.id !== id));
            };
    
            deleteRequest.onerror = (event) => {
                console.error("Erreur lors de la suppression dans IndexedDB", event);
            };
        };
    
        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données pour supprimer un élément:", event);
        };
    
    }
    


    return (
        <>

            <MesImages
                imgs={imgs}
                futureImg={futureImg}
                handleFutureImg={handleFutureImg}
                handleImg={handleImg}
                handleCancel={handleCancel}
                handleFutureImgMldc={handleFutureImgMldc}
                handleExport={handleExport}
                handleCheckedBox={handleCheckedBox}
                renameImg={renameImg}
                deleteImg={deleteImg}
            />
        </>
    )
}