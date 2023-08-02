import { useEffect } from "react"
import styles from "./cards.module.sass"

import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";

const CARD_TRANSITION_TIME_SEC = 0.25

export default function Cards({ cardArr, curCard }) {

  useEffect(() => {

    // to ensure it doesn't retrigger when prev card is removed
    if (cardArr.length == 2) {
      // fade in
      gsap.registerPlugin(MotionPathPlugin)

      if (curCard.current) {
        gsap.fromTo(curCard.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      }
    }

  }, [cardArr, curCard])

  return (
    <>
      {cardArr}
    </>
  )
}

