import { useContext, useEffect, useState } from "react"
import { Redaction } from "./Redaction"
import { RenderMD } from "./RenderMD"

import { Button, Grid2 } from "@mui/material"
import { MDContext } from "../Context/MDContext"

export const MarkdownWrite = () => {

    const [textValue, setTextValue] = useState()

    const { setMDFile } = useContext(MDContext)

    useEffect(() => {
        setMDFile(textValue)
    }, [textValue, setMDFile])

    return (
        <>
            <Grid2 size={4}>
                <Redaction redacValue={(value) => setTextValue(value)} />
            </Grid2>
            <Grid2 size={4}>
                <RenderMD value={textValue} />
            </Grid2>
            <Grid2 size={2}>
                <Button onClick={() => setTextValue("")}>Clear</Button>
                <Button onClick={() => navigator.clipboard.writeText(textValue)}>Copy</Button>
                {/* <Button onClick={() => handleSave(textValue)}>Save</Button> */}
            </Grid2>
        </>
    )
}