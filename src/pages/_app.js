import Layout from "../layout/Layout";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <div dir="rtl">
      <Head>
      <title>milad-akbari-week-21</title>
      <link rel="icon" href="/nexticon.png" />
      </Head>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster position="top-center" />
        </QueryClientProvider>
      </Layout>
    </div>
  );
}

export default MyApp;
