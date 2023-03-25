import Footer from '@/source/components/general/Footer'
import AboutSection from '@/source/components/section-about/AboutSection'
import BookSection from '@/source/components/section-book/BookSection'
import FranchiseSection from '@/source/components/section-franchise/FranchiseSection'
import HeroSection from '@/source/components/section-hero/HeroSection'
import LocationSection from '@/source/components/section-location/LocationSection'
import MenuSection from '@/source/components/section-menu/MenuSection'
import { getAllProducts, getPageMetaData } from '@/source/notion/notion'
import Head from 'next/head'

export default function Home({ menu }: any) {
  return (
    <>
      <Head>
        <title>Crafter Catering- Eatery, Bakery, Pastry & Cake Artisans</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Crafter Catering- Events Catering Specialists. Order for Eatery, Bakery, Pastry & Cake Artisans" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00C914"></meta>
      </Head>
      <main className='font-body text-darkText text-sm md:text-base z-20 min-h-screen flex flex-col tracking-wide font-semibold max-w-[1550px] mx-auto overflow-hidden'>
        <HeroSection />
        <AboutSection />
        <LocationSection />
        <MenuSection menu={menu.map((menu: any) => getPageMetaData(menu)).filter((x: any) => x.name)} />
        <BookSection />
        <FranchiseSection />
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const data = await getAllProducts()

  return {
    props: {
      menu: data,
    },
    revalidate: 60
  };
};