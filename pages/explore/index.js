import TopNav from "@/components/nav/topNav/topNav"
import styles from "./explore.module.sass"
import Link from "next/link"
import EyeDropperIcon from "@/assets/icons/eyedropper.halffull.svg"
import EyesIcon from "@/assets/icons/eyes.svg"
import { useStore } from "@/utils/store"
import BottomNav from "@/components/nav/bottomNav/bottomNav"


export default function Explore() {

  const hasCompletedQuestionnaire = useStore((state) => state.hasCompletedQuestionnaire)
  const hasSwipedProjectCards = useStore((state) => state.hasSwipedProjectCards)
  const stage = useStore((state) => state.stage)



  return (
    <div className={styles.container}>
      <TopNav />
      <div className={styles.midContainer}>
        <h1>EXPLORE <br />YOUR PATH</h1>
        <div className={styles.placeholderImage} />
      </div>
      <div className={styles.buttonsContainer}>
        <Link href={"/match?type=questionnaire"}>
          <div className={styles.button}>
            <EyeDropperIcon />
            {
              hasCompletedQuestionnaire || stage === 2 ? "Take Quiz Again" : "Tell Us Your Preference"
            }
          </div>
        </Link>
        {
          stage !== 1 ?
            <Link href={"/match?type=projects"}>
              <div className={styles.button}>
                <EyesIcon /> Start To Explore
                {
                  !hasSwipedProjectCards ?
                    <div className={styles.newDot} />
                    : null
                }
              </div>
            </Link>
            : null
        }
      </div>
      {
        stage !== 1 ?
          <BottomNav />
          :
          <div className={styles.bottomPlaceholder} />
      }
    </div>
  )
}