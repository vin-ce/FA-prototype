import Link from "next/link";
import Explore from "./explore";
import styles from "./index.module.sass"
import KnockLogoBig from "/public/icons/Knock_Logo_Big.svg"
import { useRouter } from "next/router";
import Image from "next/image";

export default function Landing() {

  const router = useRouter()
  const onClickStart = (e) => {
    e.target.classList.add(styles.selected)
    setTimeout(() => {
      e.target.classList.remove(styles.selected)
      router.push("/match/questionnaire")
    }, 100)
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Explore your creative path</h1>
        <div className={styles.logo}>
          <KnockLogoBig />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={onClickStart}>Start Preference Test</div>
        </div>
      </div>

      <img src="/background/BG Pattern - First Time.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
    </>
  )
}