import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { importTreeDB } from "../../Functions/importTreeDB";
import { getTreeDB } from "../../Functions/getTreeDB";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [fileTree, setFileTree] = useState();
    const [baseFileTree, setBaseFileTree] = useState();

    // Récupérer tous les éléments du localStorage
    const getAllLocalStorageItems = () => {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            try {
                items[key] = JSON.parse(value);
            } catch (e) {
                items[key] = value;
                console.error(e);
            }
        }
        return items;
    };

    useEffect(() => {
        const fetchTreeDB = async () => {
            const tree = await getTreeDB();
            console.log('Tree:', tree);

            const allLocalStorageItems = getAllLocalStorageItems();
            console.log("LocalStorage Items:", allLocalStorageItems);

            let updatedTree = { ...tree };

            // Vérifier si la racine existe et mettre à jour l'arborescence avec les fichiers de localStorage
            if (tree && tree.root) {
                updatedTree.root.children = updatedTree.root.children || [];

                Object.keys(allLocalStorageItems).forEach((key) => {
                    if (!updatedTree[key]) {
                        const fileItem = {
                            index: key,
                            isFolder: false,
                            data: key,
                            content: allLocalStorageItems[key],
                        };
                        updatedTree[key] = fileItem;
                        updatedTree.root.children.push(key);
                    }
                });
            } else {
                // Si l'arborescence n'existe pas, créer une nouvelle structure avec les fichiers de localStorage
                updatedTree = {
                    root: {
                        isFolder: true,
                        index: 'root',
                        children: [],
                        data: 'Root item',
                    },
                    id: Date.now(),
                };

                Object.keys(allLocalStorageItems).forEach((key) => {
                    const fileItem = {
                        index: key,
                        isFolder: false,
                        data: key,
                        content: allLocalStorageItems[key],
                    };
                    updatedTree[key] = fileItem;
                    updatedTree.root.children.push(key);
                });
            }

            setBaseFileTree(updatedTree);
        };

        fetchTreeDB();
    }, []);

    useEffect(() => {
        if (fileTree) {
            console.log('FileTree:', fileTree);
            importTreeDB(fileTree);
        }
    }, [fileTree]);

    return (
        <FileContext.Provider value={{ fileTree, setFileTree, baseFileTree, setBaseFileTree }}>
            {children}
        </FileContext.Provider>
    );
};

FileProvider.propTypes = {
    children: PropTypes.node.isRequired
};