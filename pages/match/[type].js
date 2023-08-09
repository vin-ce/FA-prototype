
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
import { careerDescriptionCardData, questionnaireCardData, reflectionCardData } from "@/assets/data/data";
import BottomNav from "@/components/nav/bottomNav/bottomNav";
import TopNav from "@/components/nav/topNav/topNav";
import { useStore } from "@/utils/store";
gsap.registerPlugin(CustomEase)

import Card from "@/components/cards/card/card";
import Cards from "@/components/cards/cards";
import Success from "@/components/success/success"
import { addQuestionnaireAnswer } from "@/utils/firebase"

const CARD_TRANSITION_TIME = 250
const CARD_TRANSITION_TIME_SEC = 0.25
const CARD_TRANSITION_EASE_OFF = CustomEase.create("custom", "M0,0,C0.5,0.004,1,0.308,1,1")

export default function Match() {


  const [cardData, setCardData] = useState(null)
  const cardType = useRef(null)

  const userId = useStore((state) => state.userId)

  const [ready, setReady] = useState(false)
  const router = useRouter()

  const setHasSwipedProjectCards = useStore((state) => state.setHasSwipedProjectCards)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)


  const curCard = useRef(null)
  const [cardIndex, setCardIndex] = useState(0)

  // -------------
  // SET DATA

  useEffect(() => {

    if (router.isReady && !ready) {

      let selectedCardType = router.query.type
      if (cardType.current !== selectedCardType) {
        cardType.current = selectedCardType
        setCardIndex(0)
        setHasReachedEnd(false)
      }

      let chosenCardData;
      if (selectedCardType === "questionnaire") {
        chosenCardData = shuffleArray(questionnaireCardData, 5)

        setCardArr([<Card reference={curCard} key={`card-0`} question={chosenCardData[0].question} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={selectedCardType} />])
      } else if (selectedCardType === "projects") {
        chosenCardData = shuffleArray(careerDescriptionCardData)

        setCardArr([<Card reference={curCard} key={`card-0`} description={chosenCardData[0].description} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={selectedCardType} />])
      } else if (selectedCardType === "reflections") {
        chosenCardData = shuffleArray(reflectionCardData, 5)

        setCardArr([<Card reference={curCard} key={`card-0`} question={chosenCardData[0].question} tag={chosenCardData[0].tag} type={"new"} index={0} cardType={selectedCardType} />])

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

      gsap.fromTo(curCard.current, { top: 0 }, { top: '-500px', ease: CARD_TRANSITION_EASE_OFF, duration: CARD_TRANSITION_TIME_SEC });

    }


    // add to firebase
    if (cardType.current === "questionnaire") {
      console.log("calling", userId, cardData[cardIndex].question, answer)
      addQuestionnaireAnswer({
        userId,
        question: cardData[cardIndex].question,
        answer,
      })
    }


    if (cardType.current === "projects") {
      // has swiped 3 cards
      if (cardIndex === 2) setHasSwipedProjectCards(true)
    }




    // create card
    let newCard

    if (newCardIndex < cardData.length) {

      if (cardType.current === 'questionnaire' || cardType.current === "reflections") {
        console.log("handling", newCardIndex)

        newCard = <Card reference={curCard} question={cardData[newCardIndex].question} tag={cardData[newCardIndex].tag} type={"new"} index={newCardIndex} cardType={cardType.current} />

      } else if (cardType.current === 'projects') {

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
      setTimeout(() => {
        setHasReachedEnd(true)
      }, 250)
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

  const hasCompletedQuestionnaire = useStore((state) => state.hasCompletedQuestionnaire)

  const isTutorial = useStore((state) => state.isTutorial)
  const setIsTutorial = useStore((state) => state.setIsTutorial)

  const handleCloseTutorial = (e) => {

    if (e.target.id === "tutorial_button") {
      e.target.classList.add(styles.selected)
      setTimeout(() => {
        e.target.classList.remove(styles.selected)
        setIsTutorial(false)
      }, 100)

    } else {
      setIsTutorial(false)
    }

  }

  // ------------
  // ELEMENT

  return ready && (
    <>
      <div className={styles.container} key={cardType.current}>
        <TopNav />
        {
          cardType.current === "questionnaire" || cardType.current === "reflections" ?
            <div className={styles.eyebrow}>
              <div className={styles.progress}>
                Question {cardIndex !== cardData.length ? cardIndex + 1 : cardData.length}/{cardData.length}
              </div>
            </div>
            : null
        }


        <div className={styles.cardContainer} {...swipeHandlers} >
          <Cards cardIndex={cardIndex} cardArr={cardArr} curCard={curCard} />
        </div>


        <div className={styles.buttonsContainer}>
          <div ref={noButtonRef} onClick={() => handleDecision("no")} className={styles.decisionButton}>NO</div>
          <div onClick={() => handleDecision("pass")} className={styles.passButton}>Skip</div>
          <div ref={yesButtonRef} onClick={() => handleDecision("yes")} className={styles.decisionButton}>YES</div>
        </div>


        {
          cardType.current === "projects" || cardType.current === "reflections" ? <BottomNav /> : <div className={styles.placeholderBottom} />
        }

        <SwipeToLeftPath className={styles.swipeToLeftPath} />
        <SwipeToRightPath className={styles.swipeToRightPath} />
      </div>



      {
        isTutorial && cardType.current === 'questionnaire' && !hasCompletedQuestionnaire ?
          <div className={styles.tutorial} onClick={handleCloseTutorial}>
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
            <div className={styles.button} id="tutorial_button" onClick={handleCloseTutorial}>Gotcha</div>
          </div> : null
      }

      {
        hasReachedEnd ?
          cardType.current === "questionnaire" ?
            <Success type="match" />
            :
            <Success type="reflections" />
          : null
      }

      <img src="/background/BG Pattern - Questionnaire Success.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/Background - Success - Reflections.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </>
  )
}




// -----------------
// HELPER FUNCS

function shuffleArray(array, num) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  if (num) array = array.slice(0, num);
  return array;
}