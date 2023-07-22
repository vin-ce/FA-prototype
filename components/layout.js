
import '@/pages/globals.sass'
import { Open_Sans } from 'next/font/google'
import Head from 'next/head'

const open_sans = Open_Sans({ subsets: ['latin'] })


export const metadata = {
  title: 'Circle',
  description: 'Career',
}

export default function Layout({ children }) {

  return (
    <>
      <Head>
        {/* prevents card going off the page from widening the page */}
        {/* https://stackoverflow.com/questions/24911220/how-to-prevent-mobile-device-to-resize-and-use-proper-css-file */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
      </Head>
      <div className={open_sans.className}>
        <main>{children}</main>
      </div>
    </>
  )
}
