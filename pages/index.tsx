import HeroSection from '@/source/components/section-hero/HeroSection'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crafter Catering- Eatery, Bakery, Pastry & Cake Artisans</title>
        <meta name="description" content="Crafter Catering- Events Catering Specialists. Order for Eatery, Bakery, Pastry & Cake Artisans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='font-body text-darkText text-sm md:text-base z-20 min-h-screen flex flex-col tracking-wide font-semibold max-w-[1550px] mx-auto overflow-hidden'>
        <HeroSection />
      </main>
    </>
  )
}
