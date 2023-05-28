import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/store";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";



export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}
