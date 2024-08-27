import { Grid2, ListItemButton } from "@mui/material"
import propTypes from "prop-types"

export const SideBar = ({ linksList }) => {
    return (
        <>
            <Grid2 size={3} height={"100%"}>
                <h1>SideBar</h1>
                <ul>
                    {linksList.map((link, index) => (
                        <ListItemButton key={index} style={{width: ''}}>
                            {link}
                        </ListItemButton>
                    ))}
                </ul>
            </Grid2>
        </>
    )
}

SideBar.propTypes = {
    linksList: propTypes.array.isRequired
}

