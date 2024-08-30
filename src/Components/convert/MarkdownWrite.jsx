import { useContext, useEffect, useState } from "react";
import { Redaction } from "./Redaction";
import { RenderMD } from "./RenderMD";
import { Button, Grid2 } from "@mui/material";
import { MDContext } from "../Context/MDContext";

export const MarkdownWrite = () => {
    const [textValue, setTextValue] = useState("");  // État pour stocker la valeur du texte
    const [fileName, setFileName] = useState("");  // État pour stocker le nom du fichier
    const { setMDFile, importedFile, updateFileContent } = useContext(MDContext);  // Contexte utilisé pour gérer le fichier MD

    // Fonction pour retrouver le nom du fichier à partir du contenu initial
    const findFileNameByContent = (content) => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if (value === content) {
                return key;
            }
        }
        return "myfile.md";  // Valeur par défaut si aucune correspondance n'est trouvée
    };

    // Met à jour le contexte avec la nouvelle valeur du texte
    useEffect(() => {
        setMDFile(textValue);

        // Sauvegarde automatique du contenu à chaque changement
        if (fileName) {
            updateFileContent(fileName, textValue);
        }
    }, [textValue, setMDFile, updateFileContent, fileName]);

    // Charge le contenu importé dans le texte à éditer et retrouve le nom du fichier
    useEffect(() => {
        if (importedFile) {
            setTextValue(importedFile);
            const foundFileName = findFileNameByContent(importedFile);
            setFileName(foundFileName);
        }
    }, [importedFile]);

    return (
        <>
            <Grid2 size={4}>
                <Redaction redacValue={(value) => setTextValue(value)} initialValue={textValue} />
            </Grid2>
            <Grid2 size={4}>
                <RenderMD value={textValue ?? ""} />
            </Grid2>
            <Grid2 size={2}>
                <Button onClick={() => setTextValue("")}>Clear</Button>
                <Button onClick={() => navigator.clipboard.writeText(textValue)}>Copy</Button>
            </Grid2>
        </>
    );
};