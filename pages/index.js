import Head from 'next/head'

import Features from '../components/Features'
import IndexBanner from '../components/IndexBanner'
import Footer from '../components/Footer'

export default function Home() {
	const data = {
		title: "Travel Tracker",
		content: "Book a ride. Record your travels. Gain insights."
	}
	
	return (
		<React.Fragment>
			<Head>
				<title>Savr.</title>
			</Head>
        <center><IndexBanner /></center>
        <Features />
		<Footer />
		</React.Fragment>
	)
}