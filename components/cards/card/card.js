import { useStore } from "@/utils/store"
import styles from "./card.module.sass"
import Link from "next/link"

export default function Card({ reference, question, description, type, index, cardType, tag }) {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)


  let cardClass = [styles.card, styles.current].join(' ')
  if (index === 0) cardClass = [cardClass, styles.firstCard].join(' ')

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
    case "feedback":
      cardClass = [cardClass, styles.feedback].join(' ')
      break
  }

  let el

  console.log("id", index, question, description)
  if (type === "new") {

    if (cardType === "questionnaire" || cardType === "reflections") {
      return (
        <div ref={reference} key={`card_${cardType}_${index}`} id={`card_${index}`} className={cardClass}>
          <div className={styles.tag}>{capitalize(tag)}</div>
          <div className={styles.question}>{question}</div>
        </div>
      )

    } else if (cardType === "projects") {
      return (
        <div ref={reference} key={`card_${cardType}_${index}`} id={`card_${index}`} className={cardClass}>
          <div className={styles.tag}>{capitalize(tag)}</div>
          <div className={styles.description}>{description}</div>
        </div>
      )
    }

  } else {
    console.log("ERROR: something went wrong creating card el")
  }

}




function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
