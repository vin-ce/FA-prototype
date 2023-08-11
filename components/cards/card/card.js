import { useStore } from "@/utils/store"
import styles from "./card.module.sass"
import Link from "next/link"

export default function Card({ reference, question, description, type, index, cardType }) {
  const setHasCompletedQuestionnaire = useStore((state) => state.setHasCompletedQuestionnaire)


  let cardClass = [styles.card, styles.current].join(' ')
  if (index === 0) cardClass = [cardClass, styles.firstCard].join(' ')


  let el

  console.log("id", index, question, description)
  if (type === "new") {

    return (
      <div ref={reference} key={`card_${cardType}_${index}`} id={`card_${index}`} className={cardClass}>
        <div className={styles.question}>{question}</div>
      </div>
    )

  } else {
    console.log("ERROR: something went wrong creating card el")
  }

}




function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
