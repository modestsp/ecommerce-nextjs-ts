import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import fetchJson from '@/lib/fetchJson';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      // This is green.A700 as hex.
      main: 'rgba(0, 0, 0, 1)',
    },
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
