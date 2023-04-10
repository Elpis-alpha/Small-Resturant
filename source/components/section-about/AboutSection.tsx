import ElpisImage from "../general/ElpisImage"

const AboutSection = () => {
	return (
		<section id="section-about" className="w-full">
			<div className="px-6 md:px-12 py-28 md:py-40 text-center z-20">
				<div className="flex items-center justify-center">
					<h1 className="font-sans font-black text-2xl ssm:text-3xl smm:text-4xl sm:text-5xl lg:text-6xl text-brightGreen">About Us</h1>
				</div>
				<div className="pt-6 w-100% sm:w-[90%] m-auto opacity-60">
					<p>
						Welcome to Fresh Bites Grill, where we believe that good food should be both delicious and nutritious.
						Our menu features a variety of fresh, flavorful dishes that are made with the finest ingredients
						and prepared with care by our skilled chefs.
					</p>

					<p className="pt-4">
						At Fresh Bites Grill, {"we're"} committed to providing a warm and welcoming atmosphere where you can enjoy great food
						and good company. Whether {"you're"} dining with friends, family, or colleagues, our friendly staff will
						ensure that you have a memorable experience.
					</p>

					<p className="pt-4">
						So come on in and experience the freshness and flavor of Fresh Bites Grill. We look forward to serving you!
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