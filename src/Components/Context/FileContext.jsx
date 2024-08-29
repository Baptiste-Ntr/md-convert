import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const FileContext = createContext()

export const FileProvider = ({ children }) => {

    const [fileTree, setFileTree] = useState()

    useEffect(() => {
        console.log("fileTree", fileTree)
    }, [fileTree, setFileTree])

    return (
        <FileContext.Provider value={{ fileTree, setFileTree }}>
            {children}
        </FileContext.Provider>
    )
}

FileProvider.propTypes = {
    children: PropTypes.node.isRequired
}
