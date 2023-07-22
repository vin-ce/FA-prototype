import { useState } from "react"
import styles from "./login.module.sass"
import Link from "next/link"

export default function Login() {

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <div className={styles.signUp}>Sign Up</div>
        <Link className={styles.login} href="/match">
          <div >
            Login
          </div>
        </Link>
      </div>
    </div>
  )

}