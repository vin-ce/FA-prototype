import { useRouter } from "next/router"
import styles from "./projectModule.module.sass"
import { useStore } from "@/utils/store"

export default function ProjectModule({ projectData, id, type }) {
  const hasCompletedReflections = useStore((state) => state.hasCompletedReflections)

  let tagsEl = []
  projectData.tags.forEach(tag => {
    tagsEl.push(<div key={`${projectData.title}_${id}`} className={styles.tag}>{tag}</div>)
  })

  let projectContainerClass = [styles.container, styles[id]].join(" ")
  if (type === "progress") {
    projectContainerClass = [projectContainerClass, styles.progress].join(' ')
  } else if (type === "pending") {
    projectContainerClass = [projectContainerClass, styles.pending].join(' ')
  }

  const router = useRouter()

  const onClickProject = () => {
    if (id === "project_2" && router.pathname === "/practice") {
      router.push('/project')
    }

  }

  return (
    <div className={projectContainerClass} onClick={onClickProject}>
      <div className={styles.type}>{projectData.type}</div>
      <div className={styles.title}>{projectData.title}</div>
      <div className={styles.dates}>
        {projectData.start} - {projectData.end}
      </div>
      <div className={styles.tags}>{tagsEl}</div>
    </div>
  )

}