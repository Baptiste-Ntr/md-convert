import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const MDContext = createContext();

export const MDProvider = ({ children }) => {
    const [mdFile, setMDFile] = useState();
    const [importedFile, setImportedFile] = useState();

    // Fonction pour sauvegarder les modifications d'un fichier dans le localStorage
    const updateFileContent = (fileName, newContent) => {
        if (!fileName) return;

        // Sauvegarder la nouvelle version du fichier dans le localStorage
        localStorage.setItem(fileName, newContent);

        // Si le fichier édité est le fichier actuellement importé, mettez à jour l'état
        if (importedFile && importedFile.name === fileName) {
            setImportedFile(newContent);
        }
    };

    return (
        <MDContext.Provider value={{ mdFile, setMDFile, importedFile, setImportedFile, updateFileContent }}>
            {children}
        </MDContext.Provider>
    );
};

MDProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
