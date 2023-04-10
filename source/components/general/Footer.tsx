import { scrollHandler } from '@/source/controllers/SpecialCtrl'
import { facebook, instagram, twitter } from '@/source/__env'
import Link from 'next/link'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import ElpisImage from "./ElpisImage"

const Footer = () => {
	return (
		// <footer className="flex w-full flex-col md:flex-row justify-between items-center text-center px-[20px] lg:px-[50px] xl:px-[100px] py-[20px]  gap-[20px] ">
		// 	<div className="h-[30px] md:h-[43px] flex-initial"><ElpisImage src="/images/blur/nav-logo.png" alt="Pixiu" title="Pixiu" className="h-full" /></div>
		// 	<div className="flex flex-col gap-[8px]">
		// 		<span>POWERED BY PIXIUVERSE</span>
		// 		<span className="text-[#848484] uppercase">© {new Date().getFullYear()} PIXIUVERSE. All rights reserved.</span>
		// 	</div>
		// 	<div className="flex gap-[16px] justify-center">
		// 		<a href="https://discord.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/discord.png" alt="" /></a>
		// 		<a href="https://twitter.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/twitter.png" alt="" /></a>
		// 		<a href="https://instagram.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/insta.png" alt="" /></a>
		// 		<a href="https://idk.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/mmeee.png" alt="" /></a>
		// 	</div>
		// </footer>
		<footer className="bg-lightGreen text-darkText">
			<div className="w-full py-8 px-6 md:px-12 flex flex-col justify-between items-center">
				<div className="flex justify-between w-full flex-col gap-4 lg:flex-row pb-4">
					<div className="max-lg:flex max-lg:items-center max-lg:justify-center max-lg:flex-col">
						<ElpisImage src="/images/blur/logo.png" title="Crafter" alt="Site logo" className="w-auto h-16 mb-2" />
						<p className="text-sm pt-3 text-center lg:text-left max-w-[400px]">Fresh Bites Grill serves delicious, nutritious meals made with the finest ingredients in a warm and welcoming atmosphere.</p>
					</div>
					<div className="flex flex-col items-center text-left">
						<ul className=" border-b pb-2 mb-1">
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-home">Home</Link></li>
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-about">About</Link></li>
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-location">Location</Link></li> <br />
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-menu">Menu</Link></li>
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-book">Book</Link></li>
							<li className="text-sm p-2 min-w-[70px] max-lg:justify-center lg:min-w-[80px] inline-flex"><Link onClick={scrollHandler} href="/#section-franchise">Franchise</Link></li> <br />
						</ul>
						<ul className="flex flex-row items-center">
							<li className="p-3"><a href={facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="text-2xl" /></a></li>
							<li className="p-3"><a href={twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="text-2xl" /></a></li>
							<li className='p-3'><a href={instagram} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl" /></a></li>
						</ul>
					</div>
				</div>
				<div className="container mx-auto text-sm text-center border-t pt-8">
					<p>&copy; 2023 Crafter. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer