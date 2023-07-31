import styles from "./topNav.module.sass"
import KnockLogo from "@/assets/icons/knock_logo.svg"
import BackIcon from "@/assets/icons/chevron.backward.svg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
// import { useStore } from "@/utils/store"

export default function TopNav() {
  // const stage = useStore(state => state.stage)
  const router = useRouter()
  const [backEl, setBackEl] = useState(<div className={[styles.back, styles.hidden].join(' ')}><BackIcon /> Back </div>
  )

  useEffect(() => {
    if (router.isReady) {
      if (router.query.type === "projects") {
        setBackEl(
          <Link href="/explore" className={styles.back}>
            <BackIcon /> Back
          </Link>
        )
      }
    }
  }, [router.isReady, router.pathname])

  return (
    <div className={styles.container}>
      {backEl}
      <KnockLogo className={styles.logo} />
    </div>
  )
}