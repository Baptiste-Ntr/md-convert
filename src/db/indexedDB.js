// https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://levelup.gitconnected.com/learn-indexeddb-creating-a-crud-application-with-indexeddb-and-react-70752f19e753

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = idb.open("markdown_repository");

request.onerror = (event) => {
  console.error("Oups");
  console.error(event);
};

// Cet évènement est seulement implémenté dans des navigateurs récents
request.onupgradeneeded = (event) => {
  const db = request.result;

    // Création du magasin d'objets pour les dossiers
  if (!db.objectStoreNames.contains("dossiers")) {
    const dossiersStore = db.createObjectStore("dossiers", { keyPath: "id", autoIncrement: true });
    dossiersStore.createIndex("emplacement", "emplacement", { unique: false });

  }

  // Création du magasin d'objets pour les fichiers
  if (!db.objectStoreNames.contains("fichiers")) {
    const fichiersStore = db.createObjectStore("fichiers", { keyPath: "id", autoIncrement: true });
    fichiersStore.createIndex("idDossier", "idDossier", { unique: false });
  }

};

// const lesFichiers = [
//   {id: 1, nom: "Fichier 1", nomDeLaClasse: "fichier", idDossier: 0, contenus: ""},
//   {id: 2, nom: "Fichier 2", nomDeLaClasse: "fichier", idDossier: 0, contenus: ""},
//   {id: 3, nom: "Fichier 3", nomDeLaClasse: "fichier", idDossier: 1, contenus: ""},
// ]

// const dossiers = [
//   {id: 1, nomDossier: "Dossier 1", fichiers: [3], emplacement: 0}
// ]

// request.onsuccess = () => {
//   console.log("Database opened successfully");

//   const db = request.result;

//   var tx = db.transaction(["dossiers", "fichiers"], "readwrite");
//   const dossiersStore = tx.objectStore("dossiers");
//   const fichiersStore = tx.objectStore("fichiers");


//   dossiers.forEach((item) => dossiersStore.add(item));
//   lesFichiers.forEach((item) => fichiersStore.add(item));

//   return tx.complete;
// };


idb.onerror = function (event) {
    // Gestionnaire d'erreur générique pour toutes les erreurs de requêtes de cette base
    alert("Database error: " + event.target.errorCode);
};

