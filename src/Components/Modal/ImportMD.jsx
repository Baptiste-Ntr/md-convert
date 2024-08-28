import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import propTypes from "prop-types"
import { useContext, useState } from "react"
import { MDContext } from "../Context/MDContext"

export const ImportMD = ({ title }) => {

    const [modal, setModal] = useState({
        open: false
    })

    const { setImportedFile } = useContext(MDContext)

    return (
        <>
            <Button variant="outlined" onClick={() => setModal({ open: true })}>
                Import MD
            </Button>
            <Dialog
                open={modal.open}
                onClose={() => setModal({ open: false })}
                PaperProps={{
                    component: "form",
                    onSubmit: ((e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const file = formData.get("file")
                        const reader = new FileReader()
                        reader.onload = () => {
                            console.log(reader.result)
                            setImportedFile(reader.result)
                        }
                        reader.readAsText(file)
                    })
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <input type="file" name="file" accept=".md" />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

ImportMD.propTypes = {
    title: propTypes.string.isRequired
}