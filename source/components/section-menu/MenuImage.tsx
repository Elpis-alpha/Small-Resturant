import { useEffect, useRef, useState } from "react"
import ElpisImage from "../general/ElpisImage"

const MenuImage = ({ src = "", alt = "", title = "", className = "" }) => {
	const [imageFailed, setImageFailed] = useState(!Boolean(src))
	const imageRef = useRef(null)
	useEffect(() => {
		if (imageRef?.current) {
			// @ts-ignore
			imageRef.current.onerror = () => setImageFailed(true)
		}
	}, [])

	if (!imageFailed) return <img src={src} alt={alt} title={title} className={className} ref={imageRef} />

	else return <ElpisImage src="/images/blur/default-food.jpg" alt={alt} title={title} className={className} />
}
export default MenuImage