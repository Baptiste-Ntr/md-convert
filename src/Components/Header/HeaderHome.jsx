import { Grid2, ListItemButton } from "@mui/material"
import { ExportMD } from "../Modal/ExportMD"
import { ImportMD } from "../Modal/ImportMD"

export const HeaderHome = () => {
    return (
        <>
            <Grid2 container height={"10vh"} padding={"10px"} spacing={3} >
                <ListItemButton style={{ display: 'flex', justifyContent: "flex-end", alignItems: "center" }}>
                    <ExportMD title="Export MD" />
                    <ImportMD title="Import MD" />
                </ListItemButton>
            </Grid2>
        </>
    )
}
