import { useState } from "react"
import { Redaction } from "./Redaction"
import { RenderMD } from "./RenderMD"

import { Grid2 } from "@mui/material"

export const MarkdownWrite = () => {

    const [textValue, setTextValue] = useState()

    return (
        <>
            <Grid2 size={4}>
                <Redaction redacValue={(value) => setTextValue(value)} />
            </Grid2>
            <Grid2 size={4}>
                <RenderMD value={textValue} />
            </Grid2>
        </>
    )
}