import { Grid2 } from "@mui/material"
import { MarkdownWrite } from "../Components/convert/MarkdownWrite"
import { SideBar } from "../Components/SideBar/SideBar"
import { Link } from "react-router-dom"
import Button from "../Components/Buttons/Button"
import { Header } from "../Components/Header/Header"

export const Home = () => {

    const linksList = [
        <Link to="/blocs" key={2}>Blocs</Link>,
        <Link to="/images" key={3}>Images</Link>,
        <Link to="/markdown" key={4}>Markdown</Link>,
    ]

    const buttonList = [
        <Button name="Export MD" fonction={() => console.log("MD")} key={1} />,
    ]

    return (
        <>
            <Header buttonList={buttonList} />
            <Grid2 container height={"80vh"} padding={"10px"} spacing={3}>
                <SideBar linksList={linksList} />
                <MarkdownWrite />
            </Grid2>
        </>
    )
}