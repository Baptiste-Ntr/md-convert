import { Grid2 } from "@mui/material"
import propTypes from "prop-types"
import FileTree from "./FileTree"
import { LinkList } from "./linkList"

export const SideBar = () => {

    return (
        <>
            <Grid2 size={3} height={"100%"}>
                <h1>SideBar</h1>
                <FileTree />
                <LinkList />
            </Grid2>
        </>
    )
}

SideBar.propTypes = {
    linksList: propTypes.array.isRequired
}

