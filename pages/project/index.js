import TopNav from "@/components/nav/topNav/topNav"
import styles from "./project.module.sass"
import BottomNav from "@/components/nav/bottomNav/bottomNav"
import Image from "next/image"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { projectsFullData } from "@/assets/data/data"

export default function Project() {

  const router = useRouter()

  const [type, setType] = useState(null)

  const onClickRegister = (e) => {
    e.target.classList.add(styles.selected)
    setTimeout(() => {
      e.target.classList.remove(styles.selected)
      if (type === "song") router.push('/explore')
      if (type === "crenshaw") router.push('/progress')
    }, 100)
  }

  const [projectData, setProjectData] = useState(null)

  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (router.isReady && !ready) {

      const selectedType = router.query.type
      setType(selectedType)
      if (selectedType === "song") setProjectData(projectsFullData.song)
      if (selectedType === "crenshaw") setProjectData(projectsFullData.crenshaw)

      setReady(true)
    }
  }, [ready, router.isReady, router.query.type])

  let tagsEl = []
  if (projectData)
    projectData.tags.forEach(tag => {
      tagsEl.push(<div key={`${projectData.title}`} className={styles.tag}>{tag}</div>)
    })

  return ready && (
    <>
      <div className={styles.container}>
        <div className={styles.scrollContainer}>
          <Image src={projectData.image} width={300} height={300} alt={"project hero"} />
          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{projectData.title}</h1>
            <div className={styles.date}>{projectData.date}</div>
            <div className={styles.tags}>{tagsEl}</div>
            <div className={styles.description}>{projectData.description}</div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.button} onClick={onClickRegister}>Register</div>
          </div>
        </div>

        <BottomNav />
      </div>




      <img src="/background/Background - Project Page.png" height={0} width={0} alt="hidden" className={"preloadHidden"} />

    </>
  )
}