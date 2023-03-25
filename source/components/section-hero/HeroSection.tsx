import Hero from "./Hero"
import Navbar from "./Navbar"

const HeroSection = () => {
	return (
		<section id="#section-home" className="w-full">
			<div className="bg-lightGreen px-6 py-6 md:px-12 md:py-8">
				<Navbar />
				<Hero />
			</div>
		</section>
	)
}
export default HeroSection