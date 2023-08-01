import { useState } from "react"
import styles from "./login.module.sass"
import Link from "next/link"

export default function Login() {

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Link className={styles.signUp} href="/match/questionnaire">
          <div>Sign Up</div>
        </Link>
        <div className={styles.login}>
          Login
        </div>
      </div>
    </div>
  )

}