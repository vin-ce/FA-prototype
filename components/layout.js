
import { Open_Sans } from 'next/font/google'
import Head from 'next/head'


export default function Layout({ children, className }) {

  return (
    <>
      <Head>
        {/* prevents card going off the page from widening the page */}
        {/* https://stackoverflow.com/questions/24911220/how-to-prevent-mobile-device-to-resize-and-use-proper-css-file */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link
          rel="preload"
          href="/fonts/GT-Pressura-Extended-Medium-Trial.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Regular-Trial.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Medium-Trial.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />


        <title>Coke Creation</title>
        {/* <description>Explore your creative path</description> */}
      </Head>
      <div className={className}>
        <main >{children}</main>
      </div>
    </>
  )
}
