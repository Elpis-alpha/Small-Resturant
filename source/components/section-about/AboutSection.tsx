import Image from "next/image"
import ElpisImage from "../general/ElpisImage"

const AboutSection = () => {
	return (
		<section id="section-about" className="w-full">
			<div className="px-6 md:px-12 py-28 md:py-40 text-center z-20">
				<div className="flex items-center justify-center">
					<Image src="/images/logo.png" blurDataURL="/images/blur/logo.png" alt="Crafter" title="Crafter" width={346} height={113} className="w-[130px]" />
				</div>
				<div className="pt-6 w-100% sm:w-[90%] m-auto opacity-60">
					<p>
						Crafter Catering is a specialized catering service that excels in catering for various events.
						We understand the importance of creating an exceptional culinary experience for your guests and are
						committed to providing high-quality food and exceptional service.
					</p>

					<p className="pt-4">
						So, whether {"you're"} looking for delectable
						pastries, scrumptious cakes, or mouth-watering savory dishes, Crafter Catering has got you covered.
					</p>
				</div>
			</div>
			<div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10">
				<ElpisImage src="/images/blur/fruit-b.png" alt="Fruits" className="w-[30%] absolute top-16 md:top-8 left-[-10px] sm:left-[-50px]" />
				<ElpisImage src="/images/blur/fruit-a.png" alt="Fruits" className="w-[20%] absolute top-16 md:top-8 right-[-10px] sm:right-[-50px]" />
			</div>
		</section>
	)
}
export default AboutSection