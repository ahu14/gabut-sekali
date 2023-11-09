import '@/styles/globals.css'
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from "react-redux";
import store from "@/pages/reducer/index.js";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color="#aaa" height={7} />
      <Component {...pageProps} />
    </Provider>
  )
}
