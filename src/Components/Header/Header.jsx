import { Grid2, ListItemButton } from "@mui/material"
import propTypes from "prop-types"

export const Header = ({ buttonList }) => {
    return (
        <>
            <Grid2 container height={"10vh"} padding={"10px"} spacing={3} display={'flex'} justifyContent={"flex-end"} alignItems={"center"}>
                <ul>
                    {buttonList.map((button, index) => (
                        <ListItemButton key={index} style={{ width: '' }}>
                            {button}
                        </ListItemButton>
                    ))}
                </ul>
            </Grid2>
        </>
    )
}

Header.propTypes = {
    buttonList: propTypes.array.isRequired
}
