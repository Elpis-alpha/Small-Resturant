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
	const minDate = new Date().toISOString().split("T")[0]

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (sendingMail) return toast.error("Please be patient")
		setSendingMail(true)
		toast.info("Sending mail")
		const form = event.target as HTMLFormElement

		try {
			await emailjs.sendForm('service_vnmbxe9', 'template_dbkcwpl', form, '1kUZnj4b88VZl_Gfk')
			toast.success("Email sent")
			setName("")
			setEmail("")
			setPhone("")
			setDate("")
			setTime("")
			setPeople("")
			form.reset()
		} catch (error) {
			toast.error("Email failed to send")
			console.log(error)
		} finally {
			setSendingMail(false)
		}
	};

	return (
		<section id="section-book" className="w-full px-6 md:px-12 py-32">
			<div className="mx-auto max-w-7xl flex flex-col gap-8 z-20">
				<div className="text-center flex flex-col gap-3">
					<h1 className='font-sans font-bold text-4xl'>Book A Table Now</h1>
					<p className='opacity-60 max-w-2xl mx-auto'>Reserve your spot in seconds. Fill in your details and our team will confirm your booking shortly.</p>
				</div>
				<form onSubmit={handleSubmit} className="bg-white bg-opacity-30 p-6 md:p-8 shadow-md backdrop-blur-sm rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					<div className="w-full">
						<label htmlFor="name" className="block mb-2 text-sm font-semibold opacity-80">
							Name
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							autoComplete="name"
							className="w-full px-4 py-3 font-medium placeholder:italic shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. Alice Henderson'
							required
						/>
					</div>
					<div className="w-full">
						<label htmlFor="email" className="block mb-2 text-sm font-semibold opacity-80">
							Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							autoComplete="email"
							className="w-full px-4 py-3 font-medium placeholder:italic shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. alice@gmail.com'
							required
						/>
					</div>
					<div className="w-full">
						<label htmlFor="phone" className="block mb-2 text-sm font-semibold opacity-80">
							Phone
						</label>
						<input
							id="phone"
							type="tel"
							name="phone"
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							autoComplete="tel"
							className="w-full px-4 py-3 font-medium placeholder:italic shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. +974 4444 5020'
							required
						/>
					</div>
					<div className="w-full">
						<label htmlFor="date" className="block mb-2 text-sm font-semibold opacity-80">
							Date
						</label>
						<input
							id="date"
							type="date"
							name="date"
							value={date}
							onChange={(event) => setDate(event.target.value)}
							className="w-full px-4 py-3 font-medium shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							min={minDate}
							required
						/>
					</div>
					<div className="w-full">
						<label htmlFor="time" className="block mb-2 text-sm font-semibold opacity-80">
							Time
						</label>
						<input
							id="time"
							type="time"
							name="time"
							value={time}
							onChange={(event) => setTime(event.target.value)}
							className="w-full px-4 py-3 font-medium shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							required
						/>
					</div>
					<div className="w-full">
						<label htmlFor="people" className="block mb-2 text-sm font-semibold opacity-80">
							People
						</label>
						<input
							id="people"
							type="number"
							name="people"
							value={people}
							onChange={(event) => setPeople(event.target.value)}
							className="w-full px-4 py-3 font-medium shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-brightGreen focus:border-transparent bg-white bg-opacity-40"
							placeholder='E.g. 3'
							min={1}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full md:w-auto md:col-span-2 lg:col-span-3 justify-self-start px-6 py-3 font-semibold rounded-md focus:outline-none bg-brightGreen text-white hover:bg-hoverBrightGreen focus:bg-hoverBrightGreen"
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