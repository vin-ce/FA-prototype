import styles from "./topNav.module.sass"
import KnockLogo from "@/assets/icons/knock_logo.svg"
import BackIcon from "@/assets/icons/chevron.backward.svg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useStore } from "@/utils/store"

export default function TopNav() {
  const setHasCompletedQuestionnaire = useStore(state => state.setHasCompletedQuestionnaire)

  const router = useRouter()
  const [backEl, setBackEl] = useState(<div className={[styles.back, styles.hidden].join(' ')}><BackIcon /> Back </div>)

  const [skipEl, setSkipEl] = useState(<div className={[styles.skip, styles.hidden].join(' ')}><BackIcon /> Skip </div>)

  useEffect(() => {
    if (router.isReady) {
      if (router.query.type === "projects") {
        setBackEl(
          <Link href="/explore" className={styles.back}>
            <BackIcon /> Back
          </Link>
        )
      } else if (router.query.type === "questionnaire") {
        setSkipEl(
          <div onClick={() => {
            router.push('/explore')
            setHasCompletedQuestionnaire(true)
          }} className={styles.skip}>
            Skip Test
          </div>
        )
      } else if (router.pathname === "/project") {
        setBackEl(
          <Link href="/practice" className={styles.back}>
            <BackIcon /> Back
          </Link>
        )
      }
    }
  }, [router.isReady, router.pathname])

  const handleLogoClick = () => {
    router.push('/explore')
  }

  return (
    <div className={styles.container}>
      {backEl}
      <KnockLogo className={styles.logo} onClick={handleLogoClick} />
      {skipEl}
    </div>
  )
}