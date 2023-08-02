import styles from "./topNav.module.sass"
import KnockLogo from "/public/icons/Knock_Logo.svg"
import BackIcon from "/public/icons/chevron.backward.svg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useStore } from "@/utils/store"

export default function TopNav() {
  const setHasCompletedQuestionnaire = useStore(state => state.setHasCompletedQuestionnaire)
  const isProfile = useStore((state) => state.isProfile)
  const setIsProfile = useStore((state) => state.setIsProfile)

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
      } else if (router.pathname === "/social" && isProfile) {
        setBackEl(
          <div className={styles.back} onClick={() => setIsProfile(false)}>
            <BackIcon /> Back
          </div>
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