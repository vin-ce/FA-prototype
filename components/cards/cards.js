import { useEffect } from "react"
import styles from "./cards.module.sass"

import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import Image from "next/image";

const CARD_TRANSITION_TIME_SEC = 0.25

export default function Cards({ cardArr, curCard, cardIndex }) {

  useEffect(() => {

    // to ensure it doesn't retrigger when prev card is removed
    if (cardArr.length == 2) {
      // fade in
      gsap.registerPlugin(MotionPathPlugin)

      if (curCard.current) {


        gsap.fromTo(curCard.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      }
    } else if (cardIndex === 0) {
      setTimeout(() => {
        gsap.fromTo(curCard.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      }, 100)
    }

  }, [cardArr, curCard])

  return (
    <>
      {cardArr}

      <img src="/background/BG Pattern - Leadership.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/BG Pattern - Interest.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/BG Pattern - Personality.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/BG Pattern - Task.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/BG Pattern - Work.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/BG Pattern - Feedback.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
    </>
  )
}

