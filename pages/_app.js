import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {

  return (
    // <Layout className={[gt_pressura.className, gt_pressura_mono.className].join(' ')}>
    <Layout >
      <Component {...pageProps} />
    </Layout>
  )
}