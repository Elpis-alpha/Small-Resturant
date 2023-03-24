import { Spin as Hamburger } from "hamburger-react"
import ElpisImage from "./ElpisImage"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
	const [navIsOpen, setNavIsOpen] = useState(false)
	return (
		<>
			<nav className="flex w-full justify-between px-[20px] lg:px-[50px] xl:px-[100px] py-[20px] bg-[#ffffff05] border-b border-[#ffffff4d] md:gap-0 gap-2 relative backdrop-blur-md">
				<div className="h-[43px] flex-1 md:flex-initial">
					<Link href="/" className="contents"><ElpisImage src="/images/blur/nav-logo.png" alt="Pixiu" title="Pixiu" className="h-full" /></Link>
				</div>
				<div className="hidden md:flex items-center">
					<ul className="flex gap-5 items-center">
						<li><Link className="hover:text-[#ff825d] duration-75	transition-all" href="/mint">Mint</Link></li>
						<li><Link className="hover:text-[#ff825d] duration-75	transition-all" href="/explorer">Explorer</Link></li>
						<li><Link className="hover:text-[#ff825d] duration-75	transition-all" href="/staking">Staking</Link></li>
						<li><Link className="cursor-not-allowed px-[13px] py-[9px] rounded-[7px] flex bg-[#d9d9d986]" href="#">Comming Soon</Link></li>
					</ul>
				</div>
				<div className="hidden ssm:flex items-center">
					<button className="flex items-center gap-[8px] md:px-[16px] md:py-[12px] px-[14px] py-[8px] el-wallet-btn rounded-[8px]">
						<img src="/images/wallet.png" alt="W" className="object-center w-[12px]" />
						<span>Connect Wallet</span>
					</button>
				</div>
				<div className="flex md:hidden">
					<Hamburger toggled={navIsOpen} toggle={setNavIsOpen} distance="sm" rounded />
				</div>
			</nav>
			<div className={`fixed md:hidden block backdrop-blur-sm w-full h-full top-0 bottom-0 z-50 ${navIsOpen ? "left-0" : "left-[101vw]"} transition-all duration-500`}>
				<div className="el-sm-nav h-full w-[300px] relative mr-0 ml-auto p-[32px] overflow-auto flex flex-col gap-[60px] justify-between">
					<div className="flex flex-col gap-[50px]">
						<div className="left-[-11px]"><Hamburger toggled={navIsOpen} toggle={setNavIsOpen} distance="sm" rounded /></div>
						<ul className="flex gap-[32px] flex-col items-start text-sm">
							<li><Link className="hover:text-[#ff825d] duration-75	transition-all" onClick={() => setNavIsOpen(false)} href="/mint">Mint</Link></li>
							<li><Link className="hover:text-[#ff825d] duration-75	transition-all" onClick={() => setNavIsOpen(false)} href="/explorer">Explorer</Link></li>
							<li><Link className="hover:text-[#ff825d] duration-75	transition-all" onClick={() => setNavIsOpen(false)} href="/staking">Staking</Link></li>
							<li><Link className="px-[16px] py-[12px] cursor-not-allowed rounded-[7px] flex bg-[#d9d9d986]" href="#">Comming Soon</Link></li>
							<div className="flex ssm:hidden items-center">
								<button className="flex items-center gap-[8px] px-[16px] py-[12px] el-wallet-btn rounded-[8px]">
									<img src="/images/wallet.png" alt="W" className="object-center w-[12px]" />
									<span>Connect Wallet</span>
								</button>
							</div>
						</ul>
					</div>
					<div className="flex flex-col gap-[30px] text-center">
						<div className="flex gap-[16px] justify-center">
							<a href="https://discord.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/discord.png" alt="" /></a>
							<a href="https://twitter.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/twitter.png" alt="" /></a>
							<a href="https://instagram.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/insta.png" alt="" /></a>
							<a href="https://idk.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/mmeee.png" alt="" /></a>
						</div>
						<div className="flex flex-col gap-[8px] text-[10px]">
							<span>POWERED BY PIXIUVERSE</span>
							<span className="text-[#848484] uppercase">© {new Date().getFullYear()} PIXIUVERSE. All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Navbar