import Footer from '@/source/components/general/Footer'
import AboutSection from '@/source/components/section-about/AboutSection'
import BookSection from '@/source/components/section-book/BookSection'
import FranchiseSection from '@/source/components/section-franchise/FranchiseSection'
import HeroSection from '@/source/components/section-hero/HeroSection'
import LocationSection from '@/source/components/section-location/LocationSection'
import MenuSection from '@/source/components/section-menu/MenuSection'
import { createClient } from 'next-sanity'
import Head from 'next/head'
import imageUrlBuilder from "@sanity/image-url";


export default function Home({ menu }: any) {
  return (
    <>
      <Head>
        <title>Fresh Bites Grill</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Fresh Bites Grill offers a delicious and nutritious menu with something for everyone. Our skilled chefs prepare fresh, flavorful dishes using only the finest ingredients. Join us for a warm and welcoming dining experience." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#00c914" />
      </Head>
      <main className='font-body text-darkText text-sm md:text-base z-20 min-h-screen flex flex-col tracking-wide font-semibold max-w-[1550px] mx-auto overflow-hidden'>
        <HeroSection />
        <AboutSection />
        <LocationSection />
        <MenuSection menu={menu.filter((x: any) => x.name)} />
        <BookSection />
        <FranchiseSection />
      </main>
      <Footer />
    </>
  )
}

const client = createClient({
  projectId: "4birj5g8",
  dataset: "production",
  apiVersion: "2023-04-04",
  useCdn: false
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const getStaticProps = async () => {
  const data = await client.fetch(`*[_type == "menu"]`);
  return {
    props: {
      menu: data.map((it: any) => {
        const image = urlFor(it.image).url()
        return { ...it, image }
      }),
      // menu: [
      //   {
      //     _createdAt: '2023-04-09T22:32:05Z',
      //     _id: '3335c812-aa2b-4d56-906e-0a1b17a971a6',
      //     _rev: 'hPMFYzf07LR1LZXhJyFnB1',
      //     _type: 'menu',
      //     _updatedAt: '2023-04-09T22:47:24Z',
      //     category: 'Breakfast',
      //     description: 'Two eggs any style, crispy bacon or sausage links, and your choice of toast or English muffin. Served with hash browns or home fries.',
      //     image: 'https://cdn.sanity.io/images/4birj5g8/production/fae9769942b7072e8b0655e153fcdab3f5cdb0e3-1024x683.png',
      //     name: 'Classic American Breakfast',
      //     price: 9.99
      //   }
      // ]
    },
  };
};