import { useRouter } from "next/router"
import styles from "./projectModule.module.sass"
import { useStore } from "@/utils/store"
import Image from "next/image"

export default function ProjectModule({ projectData, id, type }) {

  let tagsEl = []
  projectData.tags.forEach(tag => {
    tagsEl.push(<div key={`${projectData.title}_${id}`} className={styles.tag}>{tag}</div>)
  })


  const router = useRouter()

  const onClickProject = () => {
    if (id === "project_2" && router.pathname === "/practice") {
      router.push('/project')
    }
  }

  return (
    <div className={styles.container} onClick={onClickProject}>
      <div>
        {
          projectData.image ?
            <Image src={projectData.image} alt="project image" height={300} width={300} />
            :
            <div className={styles.type}>{projectData.type}</div>
        }
        <h1 className={styles.title}>{projectData.title}</h1>
      </div>
      <div>
        <div className={styles.dates}>
          {projectData.date}
        </div>
        <div className={styles.tags}>{tagsEl}</div>
      </div>
    </div>
  )

}