import propTypes from "prop-types"
import { useEffect, useRef } from "react"
import Showdown from "showdown"

export const RenderMD = ({ value }) => {

    const ref = useRef(null)

    useEffect(() => {
        const converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        })
        ref.current.innerHTML = converter.makeHtml(value ?? '')
    }, [value])

    return (
        <div>
            <div ref={ref}></div>
        </div>
    )
}

RenderMD.propTypes = {
    value: propTypes.string.isRequired
}

