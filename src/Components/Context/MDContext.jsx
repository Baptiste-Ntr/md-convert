import { createContext, useState } from "react"

import propTypes from "prop-types"

export const MDContext = createContext()

export const MDProvider = ({ children }) => {

    const [mdFile, setMDFile] = useState()

    return (
        <MDContext.Provider value={{ mdFile, setMDFile }}>
            {children}
        </MDContext.Provider>
    )
}

MDProvider.propTypes = {
    children: propTypes.node.isRequired
}
