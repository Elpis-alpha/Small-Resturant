import { useEffect, useRef } from "react"
import { reformImage } from "../../controllers/SpecialCtrl"

const ElpisImage = ({ src = "", alt = "", title = "", className = "", removeNext = false }) => {
	const imageRef = useRef(null)
	useEffect(() => { reformImage(imageRef.current, removeNext) }, [removeNext])
	return <img src={src} alt={alt} title={title} className={className} ref={imageRef} />
}

export default ElpisImage