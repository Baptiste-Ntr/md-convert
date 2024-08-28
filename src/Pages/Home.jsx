import { Grid2 } from "@mui/material"

import { SideBar } from "../Components/SideBar/SideBar"
import { Link } from "react-router-dom"
import { HeaderHome } from "../Components/Header/HeaderHome"
import { MDProvider } from "../Components/Context/MDContext"
import { MarkdownWrite } from "../Components/Convert/MarkdownWrite"

export const Home = () => {

    const linksList = [
        <Link to="/blocs" key={2}>Blocs</Link>,
        <Link to="/images" key={3}>Images</Link>,
        <Link to="/markdown" key={4}>Markdown</Link>,
    ]

    return (
        <MDProvider>
            <HeaderHome />
            <Grid2 container height={"80vh"} padding={"10px"} spacing={3}>
                <SideBar linksList={linksList} />
                <MarkdownWrite />
            </Grid2>
        </MDProvider>
    )
}