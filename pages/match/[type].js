
import styles from "./match.module.sass"
import { useEffect, useRef, useState } from "react"

import SwipeToLeftPath from "@/assets/animation/swipeToLeftPath.svg"
import SwipeToRightPath from "@/assets/animation/swipeToRightPath.svg"
import SwipeLeftIcon from "/public/icons/Swipe_Left.svg"
import SwipeRightIcon from "/public/icons/Swipe_Right.svg"

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

import Card from "@/components/cards/card/card";
import Cards from "@/components/cards/cards";
import Success from "@/components/success/success"

// const CARD_TRANSITION_TIME = 5000
// const CARD_TRANSITION_TIME_SEC = 5
const CARD_TRANSITION_TIME = 200
const CARD_TRANSITION_TIME_SEC = 0.2
const CARD_TRANSITION_EASE_OFF = CustomEase.create("custom", "M0,0,C0.5,0.004,1,0.308,1,1")

export default function Match() {


  const [cardData, setCardData] = useState(null)
  // const [cardType, setCardType] = useState(null)
  const cardType = useRef(null)

  const [ready, setReady] = useState(false)
  const router = useRouter()

  const setHasSwipedProjectCards = useStore((state) => state.setHasSwipedProjectCards)
  const stage = useStore((state) => state.stage)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)


  const curCard = useRef(null)
  const [cardIndex, setCardIndex] = useState(0)

  // -------------
  // SET DATA

  useEffect(() => {

    if (router.isReady) {
      let selectedCardType = router.query.type
      if (cardType.current !== selectedCardType) {
        cardType.current = selectedCardType
        setCardIndex(0)
        setHasReachedEnd(false)
      }

      let chosenCardData;
      if (selectedCardType === "questionnaire") {
        chosenCardData = shuffleArray(questionnaireCardData)

        setCardArr([<Card reference={curCard} key={`card-0`} question={chosenCardData[0].question} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={selectedCardType} />])
      } else if (selectedCardType === "projects") {
        chosenCardData = shuffleArray(careerDescriptionCardData)
        setHasSwipedProjectCards(true)

        setCardArr([<Card reference={curCard} key={`card-0`} description={chosenCardData[0].description} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={selectedCardType} />])
      }



      setCardData(chosenCardData)

      setReady(true)
    }
  }, [ready, router])


  // ------------------
  // ANIMATE CARDS

  const [cardArr, setCardArr] = useState(null)
  const isTransition = useRef(false)

  const noButtonRef = useRef(null)
  const yesButtonRef = useRef(null)

  const handleDecision = (answer) => {

    // prevents spamming swipe, allowing transition to complete
    if (isTransition.current || cardIndex === cardData.length) return
    isTransition.current = true


    curCard.current = document.getElementById(`card_${cardIndex}`)
    let newCardIndex = cardIndex + 1

    // remove style so it doesn't conflict with new card
    curCard.current.classList.remove(styles.current)

    if (answer === "yes") {

      // add style for z-index
      curCard.current.classList.add(styles.yes)

      // get path for animation
      const svgEl = document.querySelector(`.${styles.swipeToRightPath}`)
      const pathElement = svgEl.getElementsByTagName("path")[0];

      // apply transition off animation
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to(curCard.current, {
        duration: CARD_TRANSITION_TIME_SEC,
        // https://matthewlein.com/tools/ceaser to create beziers
        ease: CARD_TRANSITION_EASE_OFF,
        motionPath: pathElement
      })

      gsap.fromTo(curCard.current, { rotation: 0 }, { rotation: 45, ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC, });

      yesButtonRef.current.classList.add(styles.selected)

    } else if (answer === "no") {

      curCard.current.classList.add(styles.no)

      const svgEl = document.querySelector(`.${styles.swipeToLeftPath}`)
      const pathElement = svgEl.getElementsByTagName("path")[0];

      gsap.registerPlugin(MotionPathPlugin)
      gsap.to(curCard.current, {
        duration: CARD_TRANSITION_TIME_SEC,
        ease: CARD_TRANSITION_EASE_OFF,
        motionPath: pathElement
      })

      gsap.fromTo(curCard.current, { rotation: 0 }, { rotation: -45, ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC });

      noButtonRef.current.classList.add(styles.selected)


    } else if (answer === "pass") {

      curCard.current.classList.add(styles.pass)

      gsap.fromTo(curCard.current, { top: 0 }, { top: '500px', ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC });

    }

    // create card
    let newCard

    if (newCardIndex < cardData.length) {

      if (cardType.current === 'questionnaire')
        newCard = <Card reference={curCard} question={cardData[newCardIndex].question} tag={cardData[newCardIndex].tag} type={"new"} index={newCardIndex} cardType={cardType.current} />

      else if (cardType.current === 'projects') {

        let projectsCardData = cardData

        if (newCardIndex === cardData.length - 1) {
          // reset the loop so project swiping loops on indefinitely
          newCardIndex = 0
          projectsCardData = shuffleArray(projectsCardData)
          setCardData(projectsCardData)
        }

        newCard = <Card reference={curCard} description={projectsCardData[newCardIndex].description} tag={projectsCardData[newCardIndex].tag} type={"new"} index={newCardIndex} cardType={cardType.current} />

      }

    } else if (newCardIndex === cardData.length) {
      // if card index has overshot the length by 1
      newCard = <div ref={curCard} />
      setHasReachedEnd(true)
    }

    // add card to elements array so it's inserted into DOM
    setCardArr([...cardArr, newCard])

    // set new card index
    setCardIndex(newCardIndex)

    // timeout to remove clicked button styling
    setTimeout(() => {
      yesButtonRef.current.classList.remove(styles.selected)
      noButtonRef.current.classList.remove(styles.selected)
    }, CARD_TRANSITION_TIME / 2)

    // timeout to remove old card
    setTimeout(() => {
      setCardArr([newCard])
      isTransition.current = false

    }, CARD_TRANSITION_TIME)

  }



  // ---------------
  // MISC FUNCS
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleDecision("no"),
    onSwipedRight: () => handleDecision("yes"),
  })

  const [isTutorial, setIsTutorial] = useState(stage === 1)
  const onClickTutorial = () => setIsTutorial(false)

  // ------------
  // ELEMENT

  return ready && (
    <>
      <div className={styles.container} key={cardType.current}>
        <TopNav />
        {
          cardType.current === "questionnaire" ?
            <div className={styles.eyebrow}>
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
          <div ref={noButtonRef} onClick={() => handleDecision("no")} className={styles.decisionButton}>NO</div>
          <div onClick={() => handleDecision("pass")} className={styles.passButton}>Pass</div>
          <div ref={yesButtonRef} onClick={() => handleDecision("yes")} className={styles.decisionButton}>YES</div>
        </div>


        {
          cardType.current === "projects" ? <BottomNav /> : <div className={styles.placeholderBottom} />
        }

        <SwipeToLeftPath className={styles.swipeToLeftPath} />
        <SwipeToRightPath className={styles.swipeToRightPath} />
      </div>



      {
        isTutorial && cardType === 'questionnaire' ?
          <div className={styles.tutorial} onClick={onClickTutorial}>
            <div className={styles.tutorialIconsContainer}>
              <div className={styles.swipeIcon}>
                <SwipeLeftIcon />
                <span>Swipe Left <br /> No</span>
              </div>
              <div className={styles.swipeIcon}>
                <SwipeRightIcon />
                <span>Swipe Right <br /> Yes</span>
              </div>
            </div>
            <div className={styles.button}>Gotcha</div>
          </div> : null
      }

      {
        hasReachedEnd ?
          <Success type="match" />
          : null
      }
    </>
  )
}




// -----------------
// HELPER FUNCS

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}