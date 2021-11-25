import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { wrapper } from '@/lib/store';


const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) =>{
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}


export default wrapper.withRedux(MyApp);