export const importTreeDB = async (jsonPromise) => {
    const idb =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    const request = idb.open("markdown_repository", 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("dossiers")) {
            const store = db.createObjectStore("dossiers", { keyPath: "id", autoIncrement: true });
            store.add({
                id: Date.now(),
                root: {
                    isFolder: true,
                    index: 'root',
                    children: [],
                    data: 'Root item',
                },
            });
        }
    };

    request.onsuccess = async () => {
        const db = request.result;
        const transaction = db.transaction(["dossiers"], "readwrite");
        const store = transaction.objectStore("dossiers");

        try {
            const json = await jsonPromise;

            if (json && typeof json === 'object' && !Array.isArray(json)) {
                // Vérifiez si des données existent déjà
                const getRequest = store.get(json.id);

                getRequest.onsuccess = async (event) => {
                    const existingData = event.target.result;

                    if (!existingData) {
                        // Effacer les données existantes avant d'ajouter de nouvelles données
                        await store.clear();
                    }

                    // Ajouter une clé `id` unique si elle n'existe pas
                    if (!Object.prototype.hasOwnProperty.call(json, 'id')) {
                        json.id = Date.now();
                    }

                    // Ajouter ou mettre à jour l'entrée dans IndexedDB
                    const addRequest = store.put(json);

                    addRequest.onsuccess = () => {
                        console.log('Entry added or updated successfully, after import data');
                    };

                    addRequest.onerror = (addError) => {
                        console.error('Error adding or updating entry:', addError);
                    };
                };

                getRequest.onerror = (getError) => {
                    console.error('Error getting existing entry:', getError);
                };
            } else {
                throw new Error("Invalid data: json is null, not an object, or is an array");
            }
        } catch (error) {
            console.error("Error importing data: ", error);
        }

        transaction.oncomplete = () => {
            console.log("All data stored successfully!");
        };

        transaction.onerror = (transactionError) => {
            console.error('Transaction error:', transactionError);
        };
    };

    request.onerror = (event) => {
        console.error('IndexedDB error:', event);
    };
};