import { FaMapMarkerAlt } from 'react-icons/fa'
import ElpisImage from '../general/ElpisImage'

const LocationSection = () => {
	return (
		<section id="section-location" className="w-full bg-lightGreen px-6">
			<div className="px-6 md:px-10 flex flex-col md:flex-row gap-4 static">
				<div className="w-[25%] hidden md:flex static z-10">
					<ElpisImage src='/images/blur/shop.jpg' alt="shop" className="w-[80%] h-full object-cover absolute top-0 left-0 bottom-0" />
				</div>
				<div className="w-[100%] md:w-[80%] md:pl-[20%] flex flex-col gap-6 py-12 md:py-32 z-20 outfade-loc">
					<h1 className='font-sans font-bold text-4xl'>Our Location</h1>
					<p className='opacity-80'>Our restaurant is nestled in the heart of the vibrant downtown area, surrounded by bustling shops and lively entertainment venues, providing a lively and energetic atmosphere for our diners to enjoy.</p>
					<a href='https://goo.gl/maps/qrYFxSdy1PcVj5sM8' className='flex gap-2 items-center' target="_blank" rel="noopener noreferrer">
						<FaMapMarkerAlt />
						<span className='inline-block underline underline-offset-4'>Crafter Catering, Salwa Road, Doha, Qatar</span>
					</a>
					<div className="w-full flex md:hidden">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13623.120787616217!2d51.48613736289575!3d25.260561387414015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45da9829116a63%3A0x2ef1e8a13315d9f5!2sCrafter%20Catering!5e0!3m2!1sen!2sng!4v1679735569523!5m2!1sen!2sng" height="300" className="border-0 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</div>
		</section>
	)
}
export default LocationSection