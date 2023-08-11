import styles from "./success.module.sass"
import { useRouter } from "next/router"
import { useStore } from "@/utils/store"
import Image from "next/image"

export default function Success() {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)

  const router = useRouter()

  const handleOnClick = (e) => {
    e.target.classList.add(styles.selected)

    setTimeout(() => {
      e.target.classList.remove(styles.selected)

      setHasCompletedQuestionnaire(true)
      router.push(`/explore`)

    }, 100)
  }

  return (
    <>
      <div className={styles.container}>
        <h1>You’re <br /> all set!</h1>
        <div className={styles.splashIcon}>
          <Image priority={true} src={"/icons/3DCocaColaLogo_Tilted.png"} alt="Coke Logo" width={300} height={300} />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={handleOnClick}>
            Explore to create
          </div>
        </div>

      </div>

    </>
  )
}