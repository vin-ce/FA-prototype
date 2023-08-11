import { useEffect, useState } from "react"
import styles from "./progress.module.sass"
import Success from "@/components/success/success"
import TopNav from "@/components/nav/topNav/topNav"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import ProjectModule from "@/components/projectModule/projectModule"
import { projectsData } from "@/assets/data/data";
import { useStore } from "@/utils/store"
import RightArrow from "/public/icons/chevron.forward.svg"
import { useRouter } from "next/router"

export default function Progress() {

  const hasNotSeenProgressPopUp = useStore((state) => state.hasNotSeenProgressPopUp)
  const setHasNotSeenProgressPopUp = useStore((state) => state.setHasNotSeenProgressPopUp)

  const hasCompletedReflections = useStore((state) => state.hasCompletedReflections)
  const hasRegisteredProject = useStore((state) => state.hasRegisteredProject)

  const router = useRouter()
  const onClickReflection = () => {
    router.push('/match/reflections')
  }


  return (
    <>
      <div className={styles.container}>
        <TopNav />

        <div className={styles.statusBar}>
          <span className={styles.inProgress}>In Progress</span>
          <span className={styles.previous}>Previous</span>
        </div>

        <div className={styles.projects}>

          <div className={styles.projectContainer}>
            <ProjectModule projectData={projectsData[2]} id={`project_2`} type={"progress"} />
          </div>

        </div>

        <BottomNav />
      </div>


      <img src="/background/Background - Project Reminder.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />
      <img src="/background/Background - Project - Pending.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </>
  )
}