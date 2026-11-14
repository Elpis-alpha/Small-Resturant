import Head from 'next/head'
import Link from 'next/link'
import Wordmark from '@/source/components/general/Wordmark'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — Fresh Bites Grill</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
        <Link href="/" className="absolute top-6" aria-label="Fresh Bites Grill — home">
          <Wordmark />
        </Link>
        <p className="text-sunset font-display text-[38vw] font-black leading-[0.8] tracking-[-0.04em] md:text-[22rem]">404</p>
        <h1 className="mt-8 font-display text-4xl font-black tracking-[-0.02em] md:text-6xl">
          This plate’s <span className="italic text-saffron">empty</span>
        </h1>
        <p className="mt-4 max-w-[36ch] text-dust">The page you’re after has left the pass. The kitchen’s still open, though.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-saffron px-7 font-semibold text-night transition-colors duration-300 hover:bg-bone"
        >
          Back to the grill
        </Link>
      </main>
    </>
  )
}
