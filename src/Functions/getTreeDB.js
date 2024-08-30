export const getTreeDB = async () => {
    const idb =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    return new Promise((resolve, reject) => {
        const request = idb.open("markdown_repository", 1);

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("dossiers", "readwrite");
            const store = tx.objectStore("dossiers");

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                resolve(getAllRequest.result);
            };

            getAllRequest.onsuccess = () => {
                const result = getAllRequest.result;
                console.log("Result from getAll:", result); // Debugging output
                
                // Si le résultat n'est pas vide, renvoie le premier élément
                if (result && result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null); // ou {} selon votre logique
                }
            };

            getAllRequest.onerror = (event) => {
                reject(`Request error: ${event.target.errorCode}`);
            };
        };
    });
}