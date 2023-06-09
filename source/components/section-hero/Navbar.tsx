import { Spin as Hamburger } from "hamburger-react"
import ElpisImage from "../general/ElpisImage"
import { useState } from "react"
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa"
import Link from "next/link"
import { facebook, instagram, mail, tel } from "@/source/__env"

const Navbar = () => {
	const [navIsOpen, setNavIsOpen] = useState(false)
	const scrollHandler = (e: any) => {
		e.preventDefault();
		setNavIsOpen(false)
		const hashVal = e.currentTarget.getAttribute('href').split("/").join("")
		// @ts-ignore
		window.history.pushState(null, null, `${hashVal}`)
		document.querySelector(hashVal)?.scrollIntoView({
			behavior: 'smooth'
		});
	}

	return (
		<>
			<nav className="flex w-full justify-between pb-4 bg-[#ffffff05] border-b border-[#ffffff4d] md:gap-0 gap-2 relative backdrop-blur-md">
				<div className="h-[60px] flex-1 md:flex-initial">
					<Link onClick={scrollHandler} href="/#section-home" className="contents"><ElpisImage src="/images/blur/logo.png" alt="Crafter" title="Crafter" className="h-full" /></Link>
				</div>
				<div className="flex items-center gap-5 md:gap-8">
					<div className="hidden md:flex items-center">
						<ul className="flex gap-5 md:gap-8 items-center">
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-about">About</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-location">Location</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-menu">Menu</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-franchise">Franchise</Link></li>
						</ul>
					</div>
					<div className="hidden ssm:flex items-center text-brightGreen">
						<Link onClick={scrollHandler} href="/#section-book" className="flex items-center gap-[8px] md:px-[16px] md:py-[12px] px-[14px] py-[8px] rounded-full border-2 border-brightGreen">
							<span>Book Now</span>
						</Link>
					</div>
				</div>
				<div className="flex md:hidden items-center">
					<Hamburger toggled={navIsOpen} toggle={setNavIsOpen} distance="sm" rounded />
				</div>
			</nav>
			<div className={`fixed md:hidden block backdrop-blur-sm w-full h-full top-0 bottom-0 z-50 ${navIsOpen ? "left-0" : "left-[101vw]"} transition-all duration-500`}>
				<div className="el-sm-nav h-full w-[300px] relative mr-0 ml-auto p-[32px] overflow-auto flex flex-col gap-[60px] justify-between bg-[#fefefe]">
					<div className="flex flex-col gap-[50px]">
						<div className="left-[-11px]"><Hamburger toggled={navIsOpen} toggle={setNavIsOpen} distance="sm" rounded /></div>
						<ul className="flex gap-[32px] flex-col items-start text-sm">
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-about">About</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-location">Location</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-menu">Menu</Link></li>
							<li><Link onClick={scrollHandler} className="hover:text-linkHover duration-75	transition-all" href="/#section-franchise">Franchise</Link></li>
							<div className="flex ssm:hidden items-center text-[#00C914]">
								<Link onClick={scrollHandler} href="/#section-book" className="flex items-center gap-[8px] md:px-[16px] md:py-[12px] px-[14px] py-[8px] rounded-full border-2 border-brightGreen">
									<span>Book Now</span>
								</Link>
							</div>
						</ul>
					</div>
					<div className="flex flex-col gap-[30px] text-center">
						<div className="flex gap-[16px] justify-center">
							<a href={instagram} target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><FaInstagram /></a>
							<a href={facebook} target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><FaFacebook /></a>
							<a href={mail} target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><FaEnvelope /></a>
							<a href={tel} target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><FaPhone /></a>
						</div>
						<div className="flex flex-col gap-[8px] text-[10px]">
							<span>Crafter Resturant</span>
							<span className="text-[#848484] uppercase">© {new Date().getFullYear()} Crafter. All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Navbar