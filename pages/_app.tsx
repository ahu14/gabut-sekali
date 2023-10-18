import '@/styles/globals.css'
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#aaa" height={7} />
      <Component {...pageProps} />
    </>
  )
}
