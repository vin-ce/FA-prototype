import TopNav from "@/components/nav/topNav/topNav"
import styles from "./profile.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import Image from "next/image"
import SettingsIcon from "@/public/icons/settings.svg"

export default function Profile() {

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <SettingsIcon className={styles.settings} />
        <img src="/profile/Profile BG.png" alt="bg image" width={100} height={100} className={styles.bg} />
        <div className={styles.profileInfo}>
          <img src="/profile/Profile.png" alt="profile image" width={100} height={100} className={styles.profile} />

          <h1 className={styles.name}>Leonardo Dassis</h1>
          <div className={styles.subtitle}>
            <div>Participating in Coke Creations for</div>
            <div className={styles.date}>7 months</div>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Dance</span>
            <span className={styles.tag}>Content Creator</span>
            <span className={styles.tag}>Fashion</span>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Lifestyle</span>
            <span className={[styles.tag, styles.add].join(" ")}>+ Add Tags</span>
          </div>
        </div>

        <div className={styles.archive}>
          <h1 className={styles.title}>Archive</h1>
          <div className={styles.images}>
            <div className={styles.imageModule}>
              <img src="/profile/Profile Archive 1.png" alt="profile image" width={100} height={100} />
              <div className={styles.date}>Jun 02 2023</div>
            </div>
            <div className={styles.imageModule}>
              <img src="/profile/Profile Archive 2.png" alt="profile image" width={100} height={100} />
              <div className={styles.date}>Jun 14 2023</div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )

}