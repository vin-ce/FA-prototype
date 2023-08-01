import TopNav from "@/components/nav/topNav/topNav"
import styles from "./explore.module.sass"
import Link from "next/link"
import EyeDropperIcon from "@/assets/icons/eyedropper.halffull.svg"
import EyesIcon from "@/assets/icons/eyes.svg"
import KnockLogoBig from "@/assets/icons/Knock_Logo_Big.svg"
import { useStore } from "@/utils/store"
import BottomNav from "@/components/nav/bottomNav/bottomNav"


export default function Explore() {

  const hasCompletedQuestionnaire = useStore((state) => state.hasCompletedQuestionnaire)
  const hasSwipedProjectCards = useStore((state) => state.hasSwipedProjectCards)
  const stage = useStore((state) => state.stage)



  return (
    <div className={styles.container}>
      {/* <TopNav /> */}
      <div className={styles.midContainer}>
        <h1>Explore your creative path</h1>
        <KnockLogoBig />
      </div>
      <div className={styles.buttonsContainer}>
        <Link href={"/match/questionnaire"}>
          <div className={styles.button}>
            {
              hasCompletedQuestionnaire ? "Take Quiz Again" : "Tell Us Your Preference"
            }
          </div>
        </Link>

        <Link href={"/match/projects"}>
          <div className={styles.button}>
            <span className={styles.text}>
              Start To Explore
              {
                !hasSwipedProjectCards ?
                  <div className={styles.newDot} />
                  : null
              }

            </span>
          </div>
        </Link>

      </div>

      <BottomNav />

    </div>
  )
}