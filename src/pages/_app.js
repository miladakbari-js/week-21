import Layout from '../layout/Layout'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </Layout>
  )
}

export default MyApp
