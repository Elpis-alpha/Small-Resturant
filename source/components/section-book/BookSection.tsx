import { FormEvent, useState } from 'react'
import ElpisImage from '../general/ElpisImage';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const BookSection = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [people, setPeople] = useState("");
	const [sendingMail, setSendingMail] = useState(false)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (sendingMail) return toast.error("Please be patient")
		setSendingMail(true)
		toast.info("Sending mail")
		const form = event.target as HTMLFormElement
		emailjs.sendForm('service_vnmbxe9', 'template_dbkcwpl', form, '1kUZnj4b88VZl_Gfk')
			.then((result) => {
				setSendingMail(false)
				toast.success("Email sent")
				setName("")
				setEmail("")
				setPhone("")
				setDate("")
				setTime("")
				setPeople("")
				form.reset()
			}, (error) => {
				setSendingMail(false)
				toast.error("Email failed to send")
				console.log(error.text);
			}).catch(err => {
				toast.error("Email failed to send")
				setSendingMail(false)
			}).finally(() => {
				setSendingMail(false)
			});
	};

	return (
		<section id="section-book" className="w-full px-6 py-32">
			<div className="px-6 md:px-10 flex flex-col gap-4 z-20">
				<h1 className='font-sans font-bold text-4xl text-center'>Book A Table Now</h1>
				<form onSubmit={handleSubmit} className="bg-white bg-opacity-30 p-6 shadow-md flex flex-wrap justify-between backdrop-blur-sm">
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="name" className="block mb-2">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. Alice Henderson'
							required
						/>
					</div>
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="email" className="block text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. alice@gmail.com'
							required
						/>
					</div>
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="phone" className="block text-gray-700 mb-2">
							Phone
						</label>
						<input
							type="text"
							name="phone"
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. +974 4444 5020'
							required
						/>
					</div>
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="date" className="block text-gray-700 mb-2">
							Date
						</label>
						<input
							type="text"
							name="date"
							value={date}
							onChange={(event) => setDate(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. 25th December, 2024'
							required
						/>
					</div>
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="time" className="block text-gray-700 mb-2">
							Time
						</label>
						<input
							type="text"
							name="time"
							value={time}
							onChange={(event) => setTime(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. 12:30pm'
							required
						/>
					</div>
					<div className="mb-4 w-[100%] md:w-[48%] lg:w-[31%]">
						<label htmlFor="people" className="block text-gray-700 mb-2">
							People
						</label>
						<input
							type="text"
							name="people"
							value={people}
							onChange={(event) => setPeople(event.target.value)}
							className="w-full px-4 py-2 font-medium placeholder:italic border border-inputGreen rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. 3 people'
							required
						/>
					</div>
					<button
						type="submit"
						className="px-4 py-2 font-semibold rounded-md focus:outline-none bg-brightGreen text-white hover:bg-hoverBrightGreen focus:bg-hoverBrightGreen"
						disabled={sendingMail}
					>
						{sendingMail ? "Sending Mail..." : "Make a Reservation"}
					</button>
				</form>
			</div>
			<div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10">
				<ElpisImage src="/images/blur/book-b.png" alt="Fruits" className="w-[30%] opacity-60 absolute top-16 md:top-8 left-[-10px] sm:left-[-50px]" />
				<ElpisImage src="/images/blur/book-a.png" alt="Fruits" className="w-[25%] opacity-60 absolute top-16 md:top-8 right-[-10px] sm:right-[-50px]" />
			</div>
		</section>
	)
}
export default BookSection