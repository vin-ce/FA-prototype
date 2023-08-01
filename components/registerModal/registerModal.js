import styles from "./registerModal.module.sass"

import CloseIcon from "@/assets/icons/xmark.svg"
import DownIcon from "@/assets/icons/chevron.down.svg"
import { useRouter } from "next/router"
import { useState } from "react"
import Success from "../success/success"

export default function RegisterModal({ setIsRegisterModal }) {

  const [isSuccessModal, setIsSuccessModal] = useState(false)

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.container}>

          <div className={styles.header}>
            <div className={styles.title}>Registration Form</div>
            <CloseIcon onClick={() => setIsRegisterModal(false)} />
          </div>

          <div className={styles.content}>
            <div className={styles.label}>Personal Info</div>
            <div className={styles.input}>Layla Whitney</div>
            <div className={styles.input}>layla2023@gmail.com</div>
            <div className={styles.input}>(646) 123-4567</div>
            <div className={styles.footerText}>The project lead will connect with you according to your contact information.</div>


            <div className={styles.label}>Designated role in this project</div>
            <div className={styles.input}>3D Prototyper <DownIcon /></div>
            <div className={styles.input}>UI/UX Designer <DownIcon /></div>
            <div className={styles.footerText}>The selected roles are not guaranteed, the team leads will try their best to accommodate.</div>

            <div className={styles.label}>More about you</div>
            <div className={styles.inputBig}>Tell us a bit more about you!</div>

            <div className={styles.button} onClick={() => setIsSuccessModal(true)} >Submit</div>

          </div>
        </div>
      </div>
      {
        isSuccessModal ? <Success type="register" /> : null
      }
    </>
  )
}