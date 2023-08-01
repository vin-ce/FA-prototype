import { useState } from "react"
import styles from "./progress.module.sass"
import Success from "@/components/success/success"

export default function Progress() {
  const [isProgressPopUp, setIsProgressPopUp] = useState(true)

  return (
    <>
      <div></div>
      {
        isProgressPopUp ? <Success type="progress" setIsModal={setIsProgressPopUp} /> : null
      }
    </>
  )
}