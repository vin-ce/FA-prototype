import Link from "next/link";
import Explore from "./explore";
import styles from "./index.module.sass"
import CokeCreationsLogo from "/public/icons/CokeCreationsLogo.png"
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
        <div className={styles.logo}>
          <Image priority={true} src={"/icons/3DCocaColaLogo.png"} alt="Coke Logo" width={300} height={300} />
        </div>
        <h1>Expand your creations inside</h1>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={onClickStart}>Tell us more about you</div>
        </div>
      </div>

      <img src="/background/Background - Coke Primary.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
    </>
  )
}