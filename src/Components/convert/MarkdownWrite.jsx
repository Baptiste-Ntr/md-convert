import { useState } from "react"
import { Redaction } from "./Redaction"
import { RenderMD } from "./RenderMD"

import { Grid2 } from "@mui/material"

export const MarkdownWrite = () => {

    const [textValue, setTextValue] = useState()

    return (
        <>
            <Grid2 container spacing={10} height={"90vh"} padding={"30px"}>
                <Grid2 size={6}>
                    <Redaction redacValue={(value) => setTextValue(value)} />
                </Grid2>
                <Grid2 size={6}>
                    <RenderMD value={textValue} />
                </Grid2>
            </Grid2>
        </>
    )
}