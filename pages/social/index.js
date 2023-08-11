import TopNav from "@/components/nav/topNav/topNav"
import styles from "./social.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import Image from "next/image"
import { profileData } from "@/assets/data/data"
import { useState } from "react"
import SearchIcon from "/public/icons/magnifyingglass.svg"
import { useStore } from "@/utils/store"
import IndustryProfile from "/public/profileImages/Industry Profile Image 2.png"
import FilterIcon from "/public/icons/slider.horizontal.3.svg"
import ListIcon from "/public/icons/list.bullet.svg"

export default function Social() {


  return (
    <>
      <div className={styles.container}>

        <div className={styles.scrollContainer}>
          <div className={styles.search}><SearchIcon /> <span>Search</span> </div>
          <div className={styles.settings}>
            <div><FilterIcon />Filter</div>
            <div><ListIcon />Sort By</div>
          </div>


          <div className={styles.label}>
            <div className={styles.title}>Global Creators</div>
            <div className={styles.more}>View more</div>
          </div>

          <ProfileSection data={profileData[0]} />


          <div className={styles.label}>
            <div className={styles.title}>Local Creators</div>
            <div className={styles.more}>View more</div>
          </div>
          <ProfileSection data={profileData[1]} />
          <ProfileSection data={profileData[2]} />


          <div className={styles.label}>
            <div className={styles.title}>For You</div>
            <div className={styles.more}>View more</div>
          </div>
          <ProfileSection data={profileData[3]} />
          <ProfileSection data={profileData[4]} />
          <ProfileSection data={profileData[5]} />

        </div>
        <BottomNav />
      </div>



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