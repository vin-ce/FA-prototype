


import Link from "next/link";

import styles from "./match.module.sass"
import { useEffect, useRef, useState } from "react"

import SwipeToLeftPath from "@/assets/animation/swipeToLeftPath.svg"
import SwipeToRightPath from "@/assets/animation/swipeToRightPath.svg"
import ThumbsUpIcon from "@/assets/icons/hand.thumbsup.svg"

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import { CustomEase } from "gsap/dist/CustomEase"
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import { careerDescriptionCardData, questionnaireCardData } from "@/assets/data/data";
import BottomNav from "@/components/nav/bottomNav/bottomNav";
import TopNav from "@/components/nav/topNav/topNav";
import { useStore } from "@/utils/store";
gsap.registerPlugin(CustomEase)



// const CARD_TRANSITION_TIME = 5000
// const CARD_TRANSITION_TIME_SEC = 5
const CARD_TRANSITION_TIME = 200
const CARD_TRANSITION_TIME_SEC = 0.2
const CARD_TRANSITION_EASE_OFF = CustomEase.create("custom", "M0,0,C0.5,0.004,1,0.308,1,1")

export default function Match() {


  const [cardData, setCardData] = useState(null)
  const [cardType, setCardType] = useState(null)

  const [ready, setReady] = useState(false)
  const router = useRouter()

  const setHasSwipedProjectCards = useStore((state) => state.setHasSwipedProjectCards)
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)


  // -------------
  // SET DATA

  useEffect(() => {

    if (router.isReady && !ready) {
      let cardType = router.query.type
      setCardType(cardType)

      let chosenCardData;
      if (cardType === "questionnaire") {
        chosenCardData = shuffleArray(questionnaireCardData)

        setCardArr([<Card key={`card-0`} question={chosenCardData[0].question} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={cardType} />])
      } else if (cardType === "projects") {
        chosenCardData = shuffleArray(careerDescriptionCardData)
        setHasSwipedProjectCards(true)

        setCardArr([<Card key={`card-0`} description={chosenCardData[0].description} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={cardType} />])
      }



      setCardData(chosenCardData)

      setReady(true)
    }
  }, [ready, router])


  // ------------------
  // ANIMATE CARDS

  const [cardIndex, setCardIndex] = useState(0)
  const [cardArr, setCardArr] = useState(null)
  const isTransition = useRef(false)

  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)
  const notSureButtonRef = useRef(null)

  const handleDecision = (answer) => {

    // prevents spamming swipe, allowing transition to complete
    if (isTransition.current || cardIndex === cardData.length) return
    isTransition.current = true


    const curCard = document.getElementById(`card_${cardIndex}`)
    let newCardIndex = cardIndex + 1

    // remove style so it doesn't conflict with new card
    curCard.classList.remove(styles.current)

    if (answer === "yes") {

      // update data
      // cardData[cardIndex].answer = "yes"

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

      yesButtonRef.current.classList.add(styles.selected)

    } else if (answer === "no") {

      // cardData[cardIndex].answer = "no"

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

      noButtonRef.current.classList.add(styles.selected)
    } else if (answer === "notSure") {
      cardData[cardIndex].answer = "notSure"

      curCard.classList.add(styles.notSure)

      gsap.fromTo(curCard, { top: 0 }, { top: '500px', ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC });

      notSureButtonRef.current.classList.add(styles.selected)
    }

    // create card
    let newCard

    if (newCardIndex < cardData.length) {

      if (cardType === 'questionnaire')
        newCard = <Card question={cardData[newCardIndex].question} tag={cardData[newCardIndex].tag} type={"new"} index={newCardIndex} cardType={cardType} />

      else if (cardType === 'projects') {

        let projectsCardData = cardData

        if (newCardIndex === cardData.length - 1) {
          // reset the loop so project swiping loops on indefinitely
          newCardIndex = 0
          projectsCardData = shuffleArray(projectsCardData)
          setCardData(projectsCardData)
        }

        newCard = <Card description={projectsCardData[newCardIndex].description} tag={projectsCardData[newCardIndex].tag} type={"new"} index={newCardIndex} cardType={cardType} />

      }

    } else if (newCardIndex === cardData.length) {
      // if card index has overshot the length by 1
      newCard = <Card type={"complete"} index={newCardIndex} cardType={cardType} />
    }

    // add card to elements array so it's inserted into DOM
    setCardArr([...cardArr, newCard])

    // set new card index
    setCardIndex(newCardIndex)

    // timeout to remove clicked button styling
    setTimeout(() => {
      yesButtonRef.current.classList.remove(styles.selected)
      noButtonRef.current.classList.remove(styles.selected)
      notSureButtonRef.current.classList.remove(styles.selected)
    }, CARD_TRANSITION_TIME / 2)

    // timeout to remove old card
    setTimeout(() => {
      setCardArr([newCard])
      isTransition.current = false

    }, CARD_TRANSITION_TIME)

  }

  // ------------
  // CLASSES
  let decisionButtonsClass = styles.decisionButton
  let eyebrowClass = styles.eyebrow

  if (ready) {
    if (cardIndex === cardData.length) {
      decisionButtonsClass = [decisionButtonsClass, styles.hidden].join(' ')
      eyebrowClass = [eyebrowClass, styles.hidden].join(' ')
    }
  }

  // ---------------
  // MISC FUNCS
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleDecision("no"),
    onSwipedRight: () => handleDecision("yes"),
  })

  const handleSkipQuestionnaire = () => {
    setHasCompletedQuestionnaire(true)
    router.push('/explore')
  }


  // ------------
  // ELEMENT

  return ready && (
    <div className={styles.container}>
      <TopNav />
      {
        cardType === "questionnaire" ?
          <div className={eyebrowClass}>
            <div className={styles.skip} onClick={handleSkipQuestionnaire}>Skip Questionnaire</div>
            <div className={styles.progress}>
              Question {cardIndex !== cardData.length ? cardIndex + 1 : cardData.length}/{cardData.length}
            </div>
          </div>
          : null
      }


      <div className={styles.cardContainer} {...swipeHandlers} >
        <Cards cardIndex={cardIndex} cardArr={cardArr} />
      </div>


      <div className={styles.buttonsContainer}>
        <div ref={noButtonRef} onClick={() => handleDecision("no")} className={decisionButtonsClass}>NO</div>
        <div ref={notSureButtonRef} onClick={() => handleDecision("notSure")} className={decisionButtonsClass}>Not  Sure</div>
        <div ref={yesButtonRef} onClick={() => handleDecision("yes")} className={decisionButtonsClass}>YES</div>
      </div>


      {
        cardType === "projects" ? <BottomNav /> : <div className={styles.placeholderBottom} />
      }

      <SwipeToLeftPath className={styles.swipeToLeftPath} />
      <SwipeToRightPath className={styles.swipeToRightPath} />
    </div>
  )
}




function Cards({ cardArr }) {

  useEffect(() => {

    // to ensure it doesn't retrigger when prev card is removed
    if (cardArr.length == 2) {
      // fade in
      let curCard = document.querySelector(`.${styles.current}`)

      gsap.registerPlugin(MotionPathPlugin)

      if (curCard) {
        gsap.fromTo(curCard, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "power2.out", duration: CARD_TRANSITION_TIME_SEC });
      }
    }

  }, [cardArr])

  return (
    <>
      {cardArr}
    </>
  )
}

function Card({ question, description, type, index, cardType, tag }) {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)

  let cardClass = [styles.card, styles.current].join(' ')
  if (cardType === "projects") cardClass = [cardClass, styles.projectCard].join(' ')

  switch (tag) {
    case "leadership":
      cardClass = [cardClass, styles.leadership].join(' ')
      break
    case "personality":
      cardClass = [cardClass, styles.personality].join(' ')
      break
    case "interest":
      cardClass = [cardClass, styles.interest].join(' ')
      break
    case "Day-to-day Work":
      cardClass = [cardClass, styles.work].join(' ')
      break
    case "Potential Task":
      cardClass = [cardClass, styles.task].join(' ')
      break

  }

  if (type === "new") {

    if (cardType === "questionnaire") {
      return (
        <div key={`card_${index}`} id={`card_${index}`} className={cardClass}>
          <div className={styles.placeholderImage}></div>
          <div className={styles.tag}>{capitalize(tag)}</div>
          <div className={styles.question}>{question}</div>
        </div>
      )

    } else if (cardType === "projects") {
      return (
        <div key={`card_${index}`} id={`card_${index}`} className={cardClass}>
          <div className={styles.placeholderImage}></div>
          <div className={styles.tag}>{capitalize(tag)}</div>
          <div className={styles.description}>{description}</div>
        </div>
      )
    }

  } else if (type === "complete") {

    let completionText
    if (cardType === "questionnaire") completionText = "You&apos;ve completed the quiz! View your results:"
    else if (cardType === "projects") completionText = ""

    cardClass = [cardClass, styles.complete].join(' ')

    setHasCompletedQuestionnaire(true)

    return (
      <div key={`card_${index}`} id={`card_${index}`} className={cardClass}>
        <div className={styles.placeholderImage}></div>
        <h1>Great job!</h1>
        <div className={styles.question}>You&apos;ve finished the first step.</div>
        <Link href="/explore">
          <div className={styles.button}>
            <ThumbsUpIcon />
            Finish
          </div>
        </Link>
      </div>
    )
  }
  else {
    console.log("ERROR: something went wrong creating card el")
  }

}


// -----------------
// HELPER FUNCS

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}