import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from 'recoil';
import Header from '../components/header';
import Footer from '../components/footer';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Collections</title>
        <meta name="description" content="NFT Collections" />
        <link rel="shortcut icon" href="./public/favicon.ico" />
      </Head>

      <RecoilRoot>
        <div className="min-h-100vh flex flex-col justify-between">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </RecoilRoot>
    </>
  )
}

export default MyApp
