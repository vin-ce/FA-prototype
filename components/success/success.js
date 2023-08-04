import styles from "./success.module.sass"
import KnockLogo from "/public/icons/Knock_Logo.svg"
import ClapIcon from "/public/icons/hands.clap.fill.svg"
import PartyIcon from "/public/icons/party.popper.fill.svg"
import FlagIcon from "/public/icons/flag.checkered.2.crossed.svg"
import ThumbsUpIcon from "/public/icons/hand.thumbsup.fill.svg"
import { useRouter } from "next/router"
import { useStore } from "@/utils/store"
import Image from "next/image"

export default function Success({ type, setIsModal }) {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)
  const setHasRegisteredProject = useStore((state) => state.setHasRegisteredProject)
  const setHasCompletedReflections = useStore((state) => state.setHasCompletedReflections)

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
    descriptorText = <p className={styles.smallDescriptor}>Check your email for the confirmation letter. Once approved, the instructor will be in touch.</p>
    buttonText = "Explore More Roles"
  }
  else if (type === "progress") {
    containerClass = [containerClass, styles.progress].join(' ')
    titleText = "Hey Layla"
    splashIcon = <FlagIcon />
    descriptorText = (
      <div className={styles.descriptor}>
        <p className={styles.largeDescriptor}>
          You have only one week left for ‘Create an immersive AR experience for Coachella’!
        </p>
        <p className={styles.smallDescriptor}>Don’t forget to document how you are feeling so far. We would recommend you more projects based on your feedback.</p>
      </div>
    )
    buttonText = "See Progress"
  }
  else if (type === "reflections") {
    containerClass = [containerClass, styles.reflections].join(' ')
    titleText = "All Done!"
    splashIcon = <ThumbsUpIcon />
    descriptorText = (
      <p className={styles.largeDescriptor}>
        We will recommend you more projects based on your feedback.
      </p>
    )
    buttonText = "Close"
  }

  const handleOnClick = (e) => {
    e.target.classList.add(styles.selected)

    setTimeout(() => {
      e.target.classList.remove(styles.selected)

      if (type === "match") {
        setHasCompletedQuestionnaire(true)
        router.push(`/match/projects`)

      } else if (type === "register") {
        setHasRegisteredProject(true)
        router.push(`/progress?register=true`)

      } else if (type === "progress") {
        setIsModal(false)

      } else if (type === "reflections") {
        setHasCompletedReflections(true)
        router.push(`/progress`)
      }
    }, 100)
  }



  return (
    <>
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


    </>
  )
}