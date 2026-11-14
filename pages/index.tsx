import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Footer from '@/source/components/general/Footer'
import AboutSection from '@/source/components/section-about/AboutSection'
import BookSection from '@/source/components/section-book/BookSection'
import FavouritesSection from '@/source/components/section-favourites/FavouritesSection'
import Hero from '@/source/components/section-hero/Hero'
import Navbar from '@/source/components/section-hero/Navbar'
import LocationSection from '@/source/components/section-location/LocationSection'
import MenuSection from '@/source/components/section-menu/MenuSection'
import { getMenu } from '@/source/lib/menu'
import type { MenuItem } from '@/source/lib/menu'
import { site } from '@/source/site'

type Props = { menu: MenuItem[]; origin: string }

export default function Home({ menu, origin }: Props) {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={`${origin}/og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-saffron focus:px-5 focus:py-3 focus:font-semibold focus:text-night"
      >
        Skip to the menu
      </a>

      <Navbar />

      <main>
        <Hero />
        <AboutSection plates={menu.length} />
        <FavouritesSection />
        <MenuSection menu={menu} />
        <LocationSection />
        <BookSection />
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? ''
  const origin = host && !host.startsWith('http') ? `https://${host}` : host

  return {
    props: { menu: await getMenu(), origin: origin.replace(/\/$/, '') },
    // Pick up menu edits from the CMS without a redeploy.
    revalidate: 300,
  }
}
