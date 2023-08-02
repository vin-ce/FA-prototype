import Link from "next/link";
import Explore from "./explore";
import styles from "./index.module.sass"
import KnockLogoBig from "/public/icons/Knock_Logo_Big.svg"

export default function Landing() {
  return (
    <div className={styles.container}>
      <h1>Explore your creative path</h1>
      <div className={styles.logo}>
        <KnockLogoBig />

      </div>
      <div className={styles.buttonContainer}>
        <Link href="/match/questionnaire">
          <div className={styles.button}>Start Preference Test</div>
        </Link>
      </div>
    </div>
  )
}