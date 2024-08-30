import { ListItem } from "@mui/material"
import { Link } from "react-router-dom"

export const LinkList = () => {
    return (
        <ListItem style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Link to={"/"}>Home</Link>
            <Link to={"/images"}>Images</Link>
            <Link to={"/blocs"}>Bloc Perso</Link>
        </ListItem>
    )
}