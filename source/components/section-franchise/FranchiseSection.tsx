import { facebook, instagram, twitter } from '@/source/__env'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import ElpisImage from '../general/ElpisImage'

const FranchiseSection = () => {
	return (
		<section id="section-franchise" className="w-full px-6 md:px-12 py-10">
			<div className="flex flex-col md:flex-row gap-4 z-20">
				<div className="w-[100%] md:w-[50%] flex flex-col gap-6 z-20 items-start lg:py-5">
					<h1 className='font-sans font-bold text-4xl ssm:text-5xl lg:text-6xl'>Follow Our Social Media</h1>
					<a href={twitter} className='flex gap-2 items-center px-6 py-4 rounded-full shadow-md' target="_blank" rel="noopener noreferrer">
						<FaTwitter />
						<span className='inline-block pl-1'>{twitter.replace("https://www.", "")}</span>
					</a>
					<a href={instagram} className='flex gap-2 items-center px-6 py-4 rounded-full shadow-md' target="_blank" rel="noopener noreferrer">
						<FaInstagram />
						<span className='inline-block pl-1'>{instagram.replace("https://www.", "")}</span>
					</a>
					<a href={facebook} className='flex gap-2 items-center px-6 py-4 rounded-full shadow-md' target="_blank" rel="noopener noreferrer">
						<FaFacebook />
						<span className='inline-block pl-1'>{facebook.replace("https://www.", "")}</span>
					</a>
				</div>
				<div className="w-[100%] md:w-[50%] flex flex-col z-10 items-start">
					<div className="md:flex flex-col gap-4 hidden absolute top-0 left-0 right-0 bottom-0 overflow-hidden h-full w-full">
						<div className="col-span-2 h-[calc(60%_-_8px)]">
							<ElpisImage src="/images/blur/grid-1.jpg" alt="" className="w-full h-full rounded-lg object-cover object-bottom" />
						</div>
						<div className="flex gap-4 h-[calc(40%_-_8px)]">
							<div className="col-span-1 flex-1">
								<ElpisImage src="/images/blur/grid-2.jpg" alt="" className="w-full h-full rounded-lg object-cover object-bottom" />
							</div>
							<div className="col-span-1 flex-1">
								<ElpisImage src="/images/blur/grid-3.jpg" alt="" className="w-full h-full rounded-lg object-cover object-bottom" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default FranchiseSection