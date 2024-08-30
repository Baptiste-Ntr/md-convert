
export const importFileDB = async (fileContent, fileName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("markdown_repository", 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("fichiers")) {
                const fichiersStore = db.createObjectStore("fichiers", { keyPath: "id", autoIncrement: true });
                fichiersStore.createIndex("idDossier", "idDossier", { unique: false });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction("fichiers", "readwrite");
            const fichiersStore = tx.objectStore("fichiers");

            const newFile = {
                id: crypto.randomUUID(),
                nom: fileName,
                contenu: fileContent,
                idDossier: 0 // or whatever logic you have for determining idDossier
            };

            const addRequest = fichiersStore.add(newFile);

            addRequest.onsuccess = () => {
                resolve("File added successfully");
            };

            addRequest.onerror = (err) => {
                reject(`Error adding file: ${err}`);
            };

            tx.oncomplete = () => {
                db.close();
            };
        };

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
};