import { useRouter } from "next/router"
import styles from "./bottomNav.module.sass"
import Link from "next/link"

import ExploreIcon from "/public/icons/ExploreIcon.svg"
import PracticeIcon from "/public/icons/square.stack.svg"
import ProgressIcon from "/public/icons/list.bullet.clipboard.svg"
import SocialIcon from "/public/icons/bubble.left.and.bubble.right.svg"
import ProfileIcon from "/public/icons/person.svg"
import { useEffect, useRef } from "react"
import { useStore } from "@/utils/store"


export default function BottomNav() {

  const hasSwipedProjectCards = useStore((state) => state.hasSwipedProjectCards)
  const hasSeenPractice = useStore((state) => state.hasSeenPractice)
  const setHasSeenPractice = useStore((state) => state.setHasSeenPractice)


  const exploreRef = useRef(null)
  const practiceRef = useRef(null)
  const progressRef = useRef(null)
  const socialRef = useRef(null)
  const profileRef = useRef(null)

  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const curSelected = document.querySelector(`.${styles.selected}`)
      console.log(router.query.type, curSelected)
      if (curSelected) curSelected.classList.remove(styles.selected)
      switch (router.asPath) {
        case ("/explore"): {
          exploreRef.current.classList.add(styles.selected)
          break
        }
        case "/practice": {
          practiceRef.current.classList.add(styles.selected)
          break
        }
        case "/progress": {
          progressRef.current.classList.add(styles.selected)
          break
        }
        case "/social": {
          socialRef.current.classList.add(styles.selected)
          break
        }
        case "/profile": {
          profileRef.current.classList.add(styles.selected)
          break
        }
        default: {
          if (router.query.type === "projects")
            exploreRef.current.classList.add(styles.selected)
          if (router.query.type === "reflections")
            progressRef.current.classList.add(styles.selected)
          else if (router.pathname === "/project")
            practiceRef.current.classList.add(styles.selected)
        }
      }
    }
  }, [router.isReady, router.pathname])


  const onClickPractice = () => {
    if (hasSwipedProjectCards)
      setHasSeenPractice(true)

    router.push('/practice')
  }

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <Link ref={exploreRef} href="/explore" className={styles.item}>
          <ExploreIcon className={styles.icon} />
          Explore
        </Link>
      </div>
      <div className={styles.itemContainer}>
        <div onClick={onClickPractice} ref={practiceRef} className={styles.item}>
          <PracticeIcon className={styles.icon} />
          Practice
          {
            hasSwipedProjectCards && !hasSeenPractice ? <div className={styles.newDot} /> : null
          }
        </div>
      </div>
      <div className={styles.itemContainer}>
        <Link ref={progressRef} href="/progress" className={styles.item}>
          <ProgressIcon className={styles.icon} />
          Progress
        </Link>
      </div>
      <div className={styles.itemContainer}>
        <Link ref={socialRef} href="/social" className={styles.item}>
          <SocialIcon className={styles.icon} />
          Social
        </Link>
      </div>
      <div className={styles.itemContainer}>
        <Link ref={profileRef} href="/profile" className={styles.item}>
          <ProfileIcon className={styles.icon} />
          Profile
        </Link>
      </div>
    </div>
  )
}