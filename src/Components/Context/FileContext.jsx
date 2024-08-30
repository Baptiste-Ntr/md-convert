import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { importTreeDB } from "../../Functions/importTreeDB";
import { getTreeDB } from "../../Functions/getTreeDB";

export const FileContext = createContext()

export const FileProvider = ({ children }) => {

    const [fileTree, setFileTree] = useState();

    const [baseFileTree, setBaseFileTree] = useState()

    useEffect(() => {
        const fetchTreeDB = async () => {
            const tree = await getTreeDB()
            console.log('Tree:', tree);
            if (tree.root) {
                setBaseFileTree(tree);
                console.log("oui")
            } else {
                setBaseFileTree({
                    root: {
                        isFolder: true,
                        index: 'root',
                        children: [],
                        data: 'Root item',
                    },
                    id: Date.now()
                })
                console.log("non", tree)
            }
        }
        fetchTreeDB();
    }, [])

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
    )
}

FileProvider.propTypes = {
    children: PropTypes.node.isRequired
}
