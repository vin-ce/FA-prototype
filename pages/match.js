

const cardData = [
  { question: "Do you enjoy coming up with creative solutions to problems?", answer: "unanswered" },
  { question: "Are you interested in the technical aspects of projects?", answer: "unanswered" },
  { question: "Do you enjoy hands-on work and creating tangible things?", answer: "unanswered" },
  { question: "Are you detail-oriented and prioritize quality?", answer: "unanswered" },
  { question: "Do you like presenting and pitching your ideas to others?", answer: "unanswered" },
  { question: "Are you comfortable taking risks and trying new approaches?", answer: "unanswered" },
  { question: "Do you love keeping up with the latest technological advancements?", answer: "unanswered" },
  { question: "Are you good at leading a team and guiding them towards goals?", answer: "unanswered" },
  { question: "Are you curious about how products and systems work?", answer: "unanswered" },
  { question: "Do you enjoy sketching, designing, and creating visual stuff?", answer: "unanswered" },
  // { question: "Are you passionate about making a positive impact on society and the environment?", answer: "unanswered" },
  // { question: "Can you handle juggling multiple tasks and deadlines at once?", answer: "unanswered" },
  // { question: "Do you like analyzing data and making data-driven decisions?", answer: "unanswered" },
  // { question: "Are you good at problem-solving and critical thinking?", answer: "unanswered" },
  // { question: "Do you enjoy working with people and building relationships?", answer: "unanswered" },
  // { question: "Are you comfortable with managing budgets and financial aspects?", answer: "unanswered" },
  // { question: "Do you have a knack for identifying market trends and opportunities?", answer: "unanswered" },
  // { question: "Are you interested in user experience and user behavior?", answer: "unanswered" },
  // { question: "Do you like organizing and planning projects from start to finish?", answer: "unanswered" },
  // { question: "Are you skilled at communication and negotiation?", answer: "unanswered" }
];



import Link from "next/link";

import styles from "./match.module.sass"
import StarIcon from "@/assets/star.svg"
import CloseIcon from "@/assets/close.svg"
import ArrowUpwardIcon from "@/assets/arrow_upward.svg"
import { useEffect, useRef, useState } from "react"

import SwipeToLeftPath from "@/assets/animation/swipeToLeftPath.svg"
import SwipeToRightPath from "@/assets/animation/swipeToRightPath.svg"

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import { CustomEase } from "gsap/dist/CustomEase"
gsap.registerPlugin(CustomEase)

const CARD_TRANSITION_TIME = 200
const CARD_TRANSITION_TIME_SEC = 0.2
const CARD_TRANSITION_EASE_OFF = CustomEase.create("custom", "M0,0,C0.5,0.004,1,0.308,1,1")

export default function Match() {

  const [cardIndex, setCardIndex] = useState(0)
  const [cardArr, setCardArr] = useState([createCardEl({ question: cardData[0].question, type: "new", index: 0 })])
  const isTransition = useRef(false)

  const handlePreviousCard = () => {
    if (isTransition.current) return
    isTransition.current = true

    const prevCardIndex = cardIndex - 1

    // check if yes / no
    const prevCardAnswer = cardData[prevCardIndex].answer
    let prevCard

    // create appropriate card
    if (prevCardAnswer === "yes") {
      prevCard = createCardEl({ question: cardData[prevCardIndex].question, type: "prevYes", index: prevCardIndex })

    } else if (prevCardAnswer === "no") {
      prevCard = createCardEl({ question: cardData[prevCardIndex].question, type: "prevNo", index: prevCardIndex })
    }

    const curCard = document.getElementById(`card_${cardIndex}`)

    // apply unNew to cur card and animate out
    curCard.classList.remove(styles.current)
    curCard.classList.add(styles.unNew)
    gsap.fromTo(curCard, { opacity: 1, scale: 1, }, { opacity: 0, scale: 0.8, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });

    // create card
    // add card to elements array so it's inserted into DOM
    setCardArr([...cardArr, prevCard])

    // set prev card index
    setCardIndex(prevCardIndex)

    setTimeout(() => {
      setCardArr([prevCard])
      isTransition.current = false

      const prevCardEl = document.getElementById(`card_${prevCardIndex}`)
      if (prevCardAnswer === "yes") prevCardEl.classList.remove(styles.prevYes)
      else if (prevCardAnswer === "no") prevCardEl.classList.remove(styles.prevNo)

      prevCardEl.classList.add(styles.current)

    }, CARD_TRANSITION_TIME)
  }



  const handleDecision = (answer) => {

    // prevents spamming swipe, allowing transition to complete
    if (isTransition.current) return
    isTransition.current = true


    const curCard = document.getElementById(`card_${cardIndex}`)
    const newCardIndex = cardIndex + 1

    // remove style so it doesn't conflict with new card
    curCard.classList.remove(styles.current)

    if (answer === "yes") {

      // update data
      cardData[cardIndex].answer = "yes"

      // add style for z-index
      curCard.classList.add(styles.yes)

      // get path for animation
      const svgEl = document.querySelector(`.${styles.swipeToRightPath}`)
      const pathElement = svgEl.getElementsByTagName("path")[0];

      // apply transition off animation
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to(curCard, {
        duration: CARD_TRANSITION_TIME_SEC,
        // https://matthewlein.com/tools/ceaser to create beziers
        ease: CARD_TRANSITION_EASE_OFF,
        motionPath: pathElement
      })

      gsap.fromTo(curCard, { rotation: 0 }, { rotation: 45, ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC, });

    } else if (answer === "no") {

      cardData[cardIndex].answer = "no"

      curCard.classList.add(styles.no)

      const svgEl = document.querySelector(`.${styles.swipeToLeftPath}`)
      const pathElement = svgEl.getElementsByTagName("path")[0];

      gsap.registerPlugin(MotionPathPlugin)
      gsap.to(curCard, {
        duration: CARD_TRANSITION_TIME_SEC,
        ease: CARD_TRANSITION_EASE_OFF,
        motionPath: pathElement
      })

      gsap.fromTo(curCard, { rotation: 0 }, { rotation: -45, ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC });

    }

    // create card
    let newCard

    if (newCardIndex < cardData.length) {
      newCard = createCardEl({ question: cardData[newCardIndex].question, type: "new", index: newCardIndex })
    } else if (newCardIndex === cardData.length) {
      // if card index has overshot the length by 1
      newCard = createCardEl({ type: "complete", index: newCardIndex })
    }

    // add card to elements array so it's inserted into DOM
    setCardArr([...cardArr, newCard])

    // set new card index
    setCardIndex(newCardIndex)

    // timeout to remove old card
    setTimeout(() => {
      setCardArr([newCard])
      isTransition.current = false
    }, CARD_TRANSITION_TIME)

  }

  let arrowUpwardIconClass = styles.prevCardIcon
  let decisionIconsClass
  let headerClass = styles.header

  if (cardIndex === 0) arrowUpwardIconClass = [arrowUpwardIconClass, styles.hidden].join(' ')
  if (cardIndex === cardData.length) {
    decisionIconsClass = styles.hidden
    headerClass = [headerClass, styles.hidden].join(' ')
  }

  return (
    <div className={styles.container}>
      <div className={headerClass}>{cardIndex + 1} / {cardData.length}</div>
      <div className={styles.cardContainer} >
        <Card cardIndex={cardIndex} cardArr={cardArr} />
      </div>
      <div className={styles.footer}>
        <CloseIcon id="noIcon" onClick={() => handleDecision("no")} className={decisionIconsClass} />
        <ArrowUpwardIcon id="prevIcon" onClick={handlePreviousCard} className={arrowUpwardIconClass} />
        <StarIcon id="yesIcon" onClick={() => handleDecision("yes")} className={decisionIconsClass} />
      </div>

      <SwipeToLeftPath className={styles.swipeToLeftPath} />
      <SwipeToRightPath className={styles.swipeToRightPath} />
    </div>
  )
}




function Card({ cardArr }) {

  useEffect(() => {

    // to ensure it doesn't retrigger when prev card is removed
    if (cardArr.length == 2) {
      // fade in
      let curCard = document.querySelector(`.${styles.current}`)
      let prevNoCard = document.querySelector(`.${styles.prevNo}`)
      let prevYesCard = document.querySelector(`.${styles.prevYes}`)

      gsap.registerPlugin(MotionPathPlugin)

      if (curCard) {
        gsap.fromTo(curCard, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      } else if (prevYesCard) {

        // get path for animation
        const svgEl = document.querySelector(`.${styles.swipeToRightPath}`)
        const pathElement = svgEl.getElementsByTagName("path")[0];

        // apply transition on animation
        gsap.to(prevYesCard, {
          duration: CARD_TRANSITION_TIME_SEC,
          ease: "power2.out",
          motionPath: {
            path: pathElement,
            start: 1,
            end: 0,
          },
        })

        gsap.fromTo(prevYesCard, { rotation: 45, }, { rotation: 0, opacity: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC, });

      } else if (prevNoCard) {

        const svgEl = document.querySelector(`.${styles.swipeToLeftPath}`)
        const pathElement = svgEl.getElementsByTagName("path")[0];

        gsap.to(prevNoCard, {
          duration: CARD_TRANSITION_TIME_SEC,
          ease: "power2.out",
          motionPath: {
            path: pathElement,
            start: 1,
            end: 0,
          },

        })

        gsap.fromTo(prevNoCard, { rotation: -45, }, { rotation: 0, opacity: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      }
    }

  }, [cardArr])

  return (
    <>
      {cardArr}
    </>
  )
}

function createCardEl({ question, type, index }) {

  if (type === "new") {
    return (
      <div key={`card_${index}`} id={`card_${index}`} className={[styles.card, styles.current].join(' ')}>
        {question}
      </div>
    )

  } else if (type === "prevNo") {
    return (
      <div key={`card_${index}`} id={`card_${index}`} className={[styles.card, styles.prevNo].join(' ')}>
        {question}
      </div>
    )
  } else if (type === "prevYes") {
    return (
      <div key={`card_${index}`} id={`card_${index}`} className={[styles.card, styles.prevYes].join(' ')}>
        {question}
      </div>
    )
  } else if (type === "complete") {
    return (
      <div key={`card_${index}`} id={`card_${index}`} className={[styles.card, styles.current, styles.complete].join(' ')}>
        <div>You&apos;ve completed the quiz!</div>
        <Link href="results" className={styles.button}>
          <span>Finish</span>
        </Link>
      </div>
    )
  }
  else {
    console.log("ERROR: something went wrong creating card el")
  }

}