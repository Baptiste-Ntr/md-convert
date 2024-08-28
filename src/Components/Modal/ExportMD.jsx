import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"

import propTypes from "prop-types"
import { MDContext } from "../Context/MDContext"

export const ExportMD = ({ title }) => {

    const { mdFile } = useContext(MDContext)

    console.log(mdFile)

    const [modal, setModal] = useState({
        open: false,
        title: ""
    })

    const handleExport = (value, fileTile) => {
        if (value === undefined) {
            alert("Please write something to export")
        }
        const a = document.createElement("a")
        const blob = new Blob([value], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        a.href = url
        a.download = `${fileTile}.md`
        a.click()
    }


    return (
        <>
            <Button variant="outlined" onClick={() => setModal({ open: true })}>
                Export MD
            </Button>
            <Dialog
                open={modal.open}
                onClose={() => setModal({ open: false })}
                PaperProps={{
                    component: "form",
                    onSubmit: ((e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const formJson = Object.fromEntries(formData.entries())
                        console.log(formJson)
                        handleExport(mdFile, formJson.title)
                        setModal({ open: false, title: formJson.title })
                    })
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

ExportMD.propTypes = {
    title: propTypes.string.isRequired
}
