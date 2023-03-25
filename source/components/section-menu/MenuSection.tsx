import { useState } from "react"
import { v4 } from "uuid"
import MenuImage from "./MenuImage"

const MenuSection = ({ menu }: { menu: any }) => {
	// @ts-ignore
	const listOfMenus: string[] = [...new Set(menu.map((m: any) => m.category))].sort()
	const [active, setActive] = useState(listOfMenus[0])

	// console.log(menu)
	return (
		<section id="section-menu" className="w-full px-6 md:px-12 py-32">
			<div className="flex flex-col gap-6 z-20">
				<h1 className='font-sans font-bold text-4xl text-center'>Featured Menu</h1>
				<div className="">
					<div className="flex gap-4 items-center text-center flex-wrap justify-center">
						{listOfMenus.map(it => <span key={v4()} className={`inline-block cursor-pointer px-2 py-1 border-b-[3px] ${active === it ? "text-brightGreen border-brightGreen" : "border-b-transparent opacity-50"}`} onClick={() => setActive(it)}>{it}</span>)}
					</div>
					<div className="flex flex-wrap gap-4 pt-4 justify-between">
						{menu.filter((x: any) => x.category === active).map((item: any) => <div key={v4()} className="w-full md:w-[48%] lg:w-[31%] flex">
							<div className="flex-1 flex flex-col">
								<div className="w-full h-full">
									<MenuImage src={item.image} alt={item.name} title={item.name} className="w-full h-full object-cover bg-lightGreen" />
								</div>
								<div className="bg-white px-3 py-4 flex flex-col gap-2 top-[-30px] md:top-[-50px] backdrop-blur-sm w-[90%] shadow-sm">
									<h2 className="text-4xl text-brightGreen">${item.price}</h2>
									<h3 className="text-3xl pt-4 font-sans">{item.name}</h3>
									<p className="opacity-50 pt-3 font-semibold">{item.description}</p>
								</div>
							</div>
						</div>)}
					</div>
				</div>
			</div>
		</section>
	)
}
export default MenuSection