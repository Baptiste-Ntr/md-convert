import { createContext, useState } from "react"

import propTypes from "prop-types"

export const MDContext = createContext()

export const MDProvider = ({ children }) => {

    const [mdFile, setMDFile] = useState()

    const [importedFile, setImportedFile] = useState()

    return (
        <MDContext.Provider value={{ mdFile, setMDFile, importedFile, setImportedFile }}>
            {children}
        </MDContext.Provider>
    )
}

MDProvider.propTypes = {
    children: propTypes.node.isRequired
}
