import TopNav from "@/components/nav/topNav/topNav"
import styles from "./explore.module.sass"
import Link from "next/link"
import KnockLogoBig from "/public/icons/Knock_Logo_Big.svg"
import { useStore } from "@/utils/store"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function Explore() {

  const hasCompletedQuestionnaire = useStore((state) => state.hasCompletedQuestionnaire)
  const hasSwipedProjectCards = useStore((state) => state.hasSwipedProjectCards)
  const stage = useStore((state) => state.stage)

  const router = useRouter()

  const onClickQuestionnaire = (e) => {
    e.target.classList.add(styles.selected)
    setTimeout(() => {
      e.target.classList.remove(styles.selected)
      router.push("/match/questionnaire")
    }, 100)
  }

  const onClickExplore = (e) => {
    e.target.classList.add(styles.selected)
    setTimeout(() => {
      e.target.classList.remove(styles.selected)
      router.push("/match/projects")
    }, 100)
  }


  return (
    <div className={styles.container}>
      {/* <TopNav /> */}
      <div className={styles.midContainer}>
        <h1>Explore your creative path</h1>
        <KnockLogoBig />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.button} onClick={onClickQuestionnaire}>
          {
            hasCompletedQuestionnaire ? "Take Quiz Again" : "Tell Us Your Preference"
          }
        </div>

        <div className={styles.button} onClick={onClickExplore}>
          <span className={styles.text}>
            Start To Explore
            {
              hasCompletedQuestionnaire && !hasSwipedProjectCards ?
                <div className={styles.newDot} />
                : null
            }
          </span>
        </div>

      </div>

      <BottomNav />

    </div>
  )
}