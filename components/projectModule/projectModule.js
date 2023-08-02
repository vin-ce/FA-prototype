import { useRouter } from "next/router"
import styles from "./projectModule.module.sass"

export default function ProjectModule({ projectData, id }) {

  let tagsEl = []
  projectData.tags.forEach(tag => {
    tagsEl.push(<div key={`${projectData.title}_${id}`} className={styles.tag}>{tag}</div>)
  })

  let projectContainerClass = [styles.container, styles[id]].join(" ")

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