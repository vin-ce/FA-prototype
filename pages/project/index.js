import TopNav from "@/components/nav/topNav/topNav"
import styles from "./project.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import MentorProfile1 from "/public/icons/Mentor_Profile_1.png"
import MentorProfile2 from "/public/icons/Mentor_Profile_2.png"
import Image from "next/image"
import { useState } from "react"
import RegisterModal from "@/components/registerModal/registerModal"

export default function Project() {
  const [isRegisterModal, setIsRegisterModal] = useState(false)

  const onClickRegister = (e) => {
    e.target.classList.add(styles.selected)
    setTimeout(() => {
      e.target.classList.remove(styles.selected)
      setIsRegisterModal(true)
    }, 100)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <TopNav />
        </div>
        <div className={styles.contentContainer}>
          <h1>Create an immersive AR experience for Coachella.</h1>

          <div className={styles.label}>Instructor/Mentor</div>
          <div className={styles.mentorsContainer}>
            <div className={styles.mentor}>
              <Image priority={true} src={MentorProfile1} width={80} height={80} alt={"mentor image"} />
              S. Wiley
            </div>
            <div className={styles.mentor}>
              <Image priority={true} src={MentorProfile2} width={80} height={80} alt={"mentor image"} />
              M. Dean
            </div>
          </div>

          <div className={styles.label}>Roles in Demand</div>
          <div className={styles.roles}>
            <div className={styles.role}>UI/UX Designer</div>
            <div className={styles.role}>Project Manager</div>
            <div className={styles.role}>Creative Technologist</div>
            <div className={styles.role}>3D Prototype</div>
          </div>

          <div className={styles.label}>Description</div>
          <p className={styles.description}>
            “We want to provide fun and cutting edge experiences for the people who attend the show.”
            <br />
            <br />
            Coachella is embracing augmented reality (AR) with an immersive stage experience that encourages the audience to take out their phones and participate with AR interactions.
          </p>

          <div className={styles.label}>Timeline</div>
          <div className={styles.timeline}>
            <div className={styles.week}>
              <div> <div className={styles.dot} /> Week 1</div>
              <div> Kickoff & Planning</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.week}>
              <div> <div className={styles.dot} /> Week 2</div>
              <div> Concept Phase I</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.week}>
              <div> <div className={styles.dot} /> Week 3</div>
              <div> Concept Phase II</div>
            </div>

          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.button} onClick={onClickRegister}>Register</div>
          </div>
        </div>

        <BottomNav />
      </div>
      {
        isRegisterModal ? <RegisterModal setIsRegisterModal={setIsRegisterModal} /> : null
      }



      <img src="/background/Background - Project Page.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </>
  )
}