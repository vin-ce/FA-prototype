import styles from "./success.module.sass"
import KnockLogo from "@/assets/icons/Knock_Logo.svg"
import ClapIcon from "@/assets/icons/hands.clap.fill.svg"
import PartyIcon from "@/assets/icons/party.popper.fill.svg"
import FlagIcon from "@/assets/icons/flag.checkered.2.crossed.svg"
import { useRouter } from "next/router"
import { useStore } from "@/utils/store"

export default function Success({ type, setIsModal }) {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)

  const router = useRouter()
  let containerClass = styles.container
  let titleText
  let splashIcon
  let descriptorText
  let buttonText

  if (type === "match") {
    containerClass = [containerClass, styles.match].join(' ')
    titleText = <>Great <br /> Job!</>
    splashIcon = <ClapIcon />
    descriptorText = <p className={styles.largeDescriptor}>You&apos;ve finished the preference test.</p>
    buttonText = "Start to Explore"
  }
  else if (type === "register") {
    containerClass = [containerClass, styles.register].join(' ')
    titleText = "Successfully Submitted"
    splashIcon = <PartyIcon />
    descriptorText = <p className={styles.smallDescriptor}>Check your email for the confirmation letter. Once the enrollment got approved, the instructor will connect with you according to your contact information.</p>
    buttonText = "Explore More Roles"
  }
  else if (type === "progress") {
    containerClass = [containerClass, styles.progress].join(' ')
    titleText = "Hey Layla"
    splashIcon = <FlagIcon />
    descriptorText = (
      <div>
        <p className={styles.largeDescriptor}>
          You are only one week left for ‘Create an immersive AR experience for Coachella’!
        </p>
        <p className={styles.smallDescriptor}>Don’t forget to document how you are feeling so far. We would recommend you more projects based on your feedback.</p>
      </div>
    )
    buttonText = "See Progress"
  }

  const handleOnClick = () => {
    router.push(`/match/projects`)
    if (type === "match") {
      setHasCompletedQuestionnaire(true)
    } else if (type === "register") {
      // router.push(`/match/projects`)
    } else if (type === "progress") {
      // router.push(`/match/projects`)
      setIsModal(false)
    }
  }

  return (
    <div className={containerClass}>
      <div className={styles.logo} onClick={() => router.push('/explore')}><KnockLogo /></div>
      <h1>
        {titleText}
      </h1>
      <div className={styles.splashIcon}>
        {splashIcon}
      </div>
      {descriptorText}
      <div className={styles.buttonContainer}>
        <div className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </div>
      </div>
    </div>
  )
}