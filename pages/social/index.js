import TopNav from "@/components/nav/topNav/topNav"
import styles from "./social.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import Image from "next/image"
import { profileData } from "@/assets/data/data"
import { useState } from "react"
import SearchIcon from "/public/icons/magnifyingglass.svg"
import KnockLogo from "/public/icons/Knock_Logo.svg"
import { useStore } from "@/utils/store"
import IndustryProfile from "/public/profileImages/Industry Profile Image 2.png"

export default function Social() {

  const isProfile = useStore((state) => state.isProfile)

  return (
    <>
      <div className={styles.container}>
        {
          !isProfile ?
            <>
              <TopNav />
              <div className={styles.content}>
                <div className={styles.search}><SearchIcon />Search</div>

                <div className={styles.labelContainer}>
                  <span>Folks in the industry</span>
                  <span>View More</span>
                </div>

                <ProfileSection data={profileData[0]} />
                <ProfileSection data={profileData[1]} />

                <div className={styles.labelContainer}>
                  <span>Like-minded Peers</span>
                  <span>View More</span>
                </div>
                <ProfileSection data={profileData[2]} />
                <ProfileSection data={profileData[3]} />

              </div>
            </>
            :
            <>
              <div className={styles.header}>
                <TopNav />
                <div className={styles.topInfo}>
                  <img priority={true} src={"/profileImages/Industry Profile Image 2.png"} alt="profile image" width={64} height={64} />
                  <div className={styles.basicInfo}>
                    <div className={styles.name}>{profileData[1].name}</div>
                    <div>
                      <div className={styles.role}>Senior XR Designer at Fire Studio</div>
                      <div className={styles.location}>Los Angeles, CA</div>
                    </div>
                  </div>
                </div>
                <div className={styles.social}>
                  <span>Linkedin</span>
                  <span>Email</span>
                </div>

              </div>

              <div className={styles.moreInfoContainer}>
                <div className={styles.label}>General Interest</div>
                <div className={styles.description}>Cooking and baking!</div>

                <div className={styles.label}>Skillset</div>
                <div className={styles.description}>XR prototyping with Unity; creative technology</div>

                <div className={styles.label}>About</div>
                <div className={styles.description}>Hi there, this is Lennie. Feel free to drop me any questions via Linkedin or E-mail. I’ll be always open to help. I’d also love to schedule 1-1 meeting or coffee chat with you folks, just message me or send me an e-mail. Let’s chat!</div>
              </div>
            </>
        }
        <BottomNav />
      </div>


      <img src="/background/Background - Industry Profile Section.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/Background - Peer Profile Section.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/Background - Industry Profile.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </>
  )
}


function ProfileSection({ data }) {
  const setIsProfile = useStore((state) => state.setIsProfile)

  let tags = []
  data.tags.forEach(tag => {
    tags.push(
      <span key={`${data.name}_${tag}`} className={styles.tag}>{tag}</span>
    )
  })

  let profileClass = styles.profile
  if (data.type === "industry") profileClass = [profileClass, styles.industry].join(' ')
  else if (data.type === "peer") profileClass = [profileClass, styles.peer].join(' ')

  const onClickProfile = () => {
    if (data.name === "L. M. Joseph") {
      setIsProfile(true)
    }
  }

  return (
    <div className={profileClass} onClick={onClickProfile}>
      <img src={data.imageSrc} alt="profile image" width={64} height={64} />
      <div className={styles.textInfo}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.tags}>
          {tags}
        </div>
      </div>
    </div>
  )

}