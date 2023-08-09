import Layout from "@/components/layout";
import "./globals.sass"
import { useEffect } from "react";
import { getId } from "@/utils/firebase";
import { useStore } from "@/utils/store";


export default function App({ Component, pageProps }) {
  const userId = useStore((state) => state.userId)
  const setUserId = useStore((state) => state.setUserId)


  useEffect(() => {

    if (!userId) init()
    async function init() {
      let createdUserId = await getId()
      setUserId(createdUserId)
      console.log("id", createdUserId)
    }

  }, [setUserId, userId])

  return (
    // <Layout className={[gt_pressura.className, gt_pressura_mono.className].join(' ')}>

    <Layout >
      <Component {...pageProps} />

      <img src="/background/BG Pattern - Explore.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </Layout>
  )
}
