import { Grid2 } from "@mui/material"
import propTypes from "prop-types"
import FileTree from "./FileTree"
import { LinkList } from "./linkList"
import { useContext } from "react"
import { FileContext } from "../Context/FileContext"

export const SideBar = () => {

    const { fileTree } = useContext(FileContext)

    return (
        <>
            <Grid2 size={3} height={"100%"}>
                <h1>SideBar</h1>
                <FileTree />
                <LinkList />
                {JSON.stringify(fileTree)}
            </Grid2>
        </>
    )
}

SideBar.propTypes = {
    linksList: propTypes.array.isRequired
}

