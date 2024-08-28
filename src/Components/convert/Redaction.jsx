import PropTypes from "prop-types"
import { useEffect, useState } from "react"

export const Redaction = ({ redacValue, initialValue }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (event) => {
        setValue(event.target.value);
        redacValue(event.target.value);
    };

    return (
        <textarea value={value} onChange={handleChange} style={{ width: '100%', height: "100%", resize: "none", fontFamily: "'Poppins', 'sans-serif'", padding: "10px" }} />
    );
};

Redaction.propTypes = {
    redacValue: PropTypes.func.isRequired,
    initialValue: PropTypes.string
}
