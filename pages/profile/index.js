import TopNav from "@/components/nav/topNav/topNav"
import styles from "./profile.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"

export default function Profile() {

  return (
    <div className={styles.container}>
      <TopNav />
      <div className={styles.content}>Page is under construction.</div>
      <BottomNav />
    </div>
  )

}