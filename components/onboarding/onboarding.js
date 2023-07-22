import { useEffect, useRef, useState } from "react"
import styles from "./onboarding.module.sass"

import ArrowBackIOSIcon from "@/assets/arrow_back_ios.svg"
import ArrowForwardIOSIcon from "@/assets/arrow_forward_ios.svg"
import Login from "../login/login"

export default function Onboarding() {

  const [page, setPage] = useState(1)

  // swiping on page changes page

  const handlePrevPage = () => {
    const prevPage = page - 1
    const curPage = page

    document.getElementById(`trackerDot${prevPage}`).classList.add(styles.active)
    document.getElementById(`trackerDot${curPage}`).classList.remove(styles.active)

    if (prevPage === 1) document.getElementById('arrow-back').classList.add(styles.hidden)
    if (prevPage === 3) document.getElementById('arrow-forward').classList.remove(styles.hidden)

    setPage(prevPage)
  }

  const handleNextPage = () => {
    const nextPage = page + 1
    const curPage = page

    document.getElementById(`trackerDot${nextPage}`).classList.add(styles.active)
    document.getElementById(`trackerDot${curPage}`).classList.remove(styles.active)


    if (nextPage === 4) document.getElementById('arrow-forward').classList.add(styles.hidden)
    if (nextPage === 2) document.getElementById('arrow-back').classList.remove(styles.hidden)

    setPage(nextPage)
  }

  return (
    <div className={styles.container}>
      <PageTracker page={page} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      <OnboardingPageTemplate page={page} />
      <Login />
    </div>
  )

}

function PageTracker({ page, handleNextPage, handlePrevPage }) {


  return (
    <div className={styles.pageTrackerContainer}>
      <ArrowBackIOSIcon id={`arrow-back`} className={styles.hidden} onClick={handlePrevPage} />
      <div className={styles.trackerDotContainer}>
        <div id="trackerDot1" className={[styles.trackerDot, styles.active].join(' ')} />
        <div id="trackerDot2" className={styles.trackerDot} />
        <div id="trackerDot3" className={styles.trackerDot} />
        <div id="trackerDot4" className={styles.trackerDot} />
      </div>
      <ArrowForwardIOSIcon id={`arrow-forward`} onClick={handleNextPage} />
    </div>
  )
}

function OnboardingPageTemplate({ page }) {

  const pageData = [
    {
      pageText: "Find Your Interest"
    },
    {
      pageText: "Meet Your Cohort"
    },
    {
      pageText: "Work On Project"
    },
    {
      pageText: "Get Connected"
    },
  ]

  return (
    <div className={styles.onboardingPageContainer}>
      <div className={styles.headerImage}>image</div>
      <div className={styles.infoContainer}>
        <div className={styles.step}>Step {page}</div>
        <div className={styles.pageText}>{pageData[page - 1].pageText}</div>
      </div>
    </div>
  )
}