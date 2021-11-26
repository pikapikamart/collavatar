import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { wrapper } from '@/lib/store';
import { Layout } from '@/page-components/layout';
import "@/styles/scss/style.scss";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) =>{
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  );
}


export default wrapper.withRedux(MyApp);