import Image from "next/image"
import Link from "next/link"

const Hero = () => {
	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex flex-col gap-4 w-[100%] md:w-[60%] pt-4 md:py-8 z-20 justify-center outfade-hero">
				<h1 className="font-sans font-black text-4xl ssm:text-5xl smm:text-6xl sm:text-7xl lg:text-8xl text-brightGreen whitespace-pre">Taste the<br />Difference</h1>
				<p className="max-w-[550px]">Crafter Catering specializes in catering for events and is experienced in catering for eatery, bakery, pastry, and cake artisans.</p>
				<Link href="/#section-order" className="inline-flex mt-4 self-start items-center md:px-[20px] md:py-[12px] px-[14px] py-[8px] rounded-full text-white bg-brightGreen">
					<span>Order Now</span>
				</Link>
			</div>
			<div className="w-[100%] sm:w-[80%] m-auto md:w-[40%] flex items-center justify-center z-10">
				<Image src="/images/hero.png" placeholder="blur" blurDataURL="/images/blur/hero.png" width={1538} height={776} className="w-[100%] md:w-[180%] md:left-[-20%] max-w-none" alt="A special dish" />
			</div>
		</div>
	)
}
export default Hero