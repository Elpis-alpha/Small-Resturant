import { scrollHandler } from "@/source/controllers/SpecialCtrl"
import Image from "next/image"
import Link from "next/link"
import ElpisImage from "../general/ElpisImage"

const Hero = () => {

	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex flex-col gap-4 w-[100%] md:w-[60%] pt-4 md:py-8 z-20 justify-center outfade-hero">
				<h1 className="font-sans font-black text-4xl ssm:text-5xl smm:text-6xl sm:text-7xl lg:text-8xl text-brightGreen whitespace-pre">Taste the<br />Difference</h1>
				<p className="max-w-[550px]">Crafter Catering specializes in catering for events and is experienced in catering for eatery, bakery, pastry, and cake artisans.</p>
				<Link onClick={scrollHandler} href="/#section-book" className="inline-flex mt-4 self-start items-center md:px-[20px] md:py-[12px] px-[14px] py-[8px] rounded-full text-white bg-brightGreen hover:bg-hoverBrightGreen focus:bg-hoverBrightGreen">
					<span>Book Now</span>
				</Link>
			</div>
			<div className="w-[100%] sm:w-[80%] m-auto md:w-[40%] flex items-center justify-center z-10">
				{/* <img src="/images/blur/hero.png" className="w-[100%] md:w-[180%] md:left-[-20%] max-w-none" alt="A special dish" /> */}
				<ElpisImage src="/images/blur/hero.png" className="w-[100%] md:w-[180%] md:left-[-20%] max-w-none" alt="A special dish" />
			</div>
		</div>
	)
}
export default Hero