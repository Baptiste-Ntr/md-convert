import PropTypes from "prop-types"
import { useEffect, useState } from "react"

export const Redaction = ({ redacValue }) => {

    const [textValue, setTextValue] = useState()

    useEffect(() => {
        redacValue(textValue)
    }, [textValue, redacValue])

    return (
        <>
            <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} style={{ width: '100%', height: "100%", resize: "none", fontFamily: "'Poppins', 'sans-serif'", padding: "10px" }}>
            </textarea>
        </>
    )
}

Redaction.propTypes = {
    redacValue: PropTypes.string.isRequired
}
