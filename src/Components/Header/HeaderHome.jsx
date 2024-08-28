import { Grid2, ListItemButton } from "@mui/material"
import { ExportMD } from "../Modal/ExportMD"

export const HeaderHome = () => {
    return (
        <>
            <Grid2 container height={"10vh"} padding={"10px"} spacing={3} display={'flex'} justifyContent={"flex-end"} alignItems={"center"}>
                <ul>
                    <ListItemButton>
                        <ExportMD title="Export MD" />
                    </ListItemButton>
                </ul>
            </Grid2>
        </>
    )
}
