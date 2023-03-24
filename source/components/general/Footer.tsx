import ElpisImage from "./ElpisImage"

const Footer = () => {
	return (
		<footer className="flex w-full flex-col md:flex-row justify-between items-center text-center px-[20px] lg:px-[50px] xl:px-[100px] py-[20px] bg-[#ffffff05] border-t border-[#ffffff4d] gap-[20px] backdrop-blur-md">
			<div className="h-[30px] md:h-[43px] flex-initial"><ElpisImage src="/images/blur/nav-logo.png" alt="Pixiu" title="Pixiu" className="h-full" /></div>
			<div className="flex flex-col gap-[8px]">
				<span>POWERED BY PIXIUVERSE</span>
				<span className="text-[#848484] uppercase">© {new Date().getFullYear()} PIXIUVERSE. All rights reserved.</span>
			</div>
			<div className="flex gap-[16px] justify-center">
				<a href="https://discord.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/discord.png" alt="" /></a>
				<a href="https://twitter.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/twitter.png" alt="" /></a>
				<a href="https://instagram.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/insta.png" alt="" /></a>
				<a href="https://idk.com/" target="_blank" className="h-[18px] duration-75 transition-all hover:scale-110 flex" rel="noopener noreferrer"><img src="/images/mmeee.png" alt="" /></a>
			</div>
		</footer>
	)
}
export default Footer