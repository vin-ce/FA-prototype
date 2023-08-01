import styles from "./practice.module.sass"
import { projectsData } from "@/assets/data/data";
import TopNav from "@/components/nav/topNav/topNav";
import BottomNav from "@/components/nav/bottomNav/bottomNav";
import ListIcon from "/public/icons/list.bullet.svg"
import FilterIcon from "/public/icons/slider.horizontal.3.svg"
import SearchIcon from "/public/icons/magnifyingglass.svg"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Practice() {



  return (
    <div className={styles.container}>

      <TopNav />

      <div className={styles.search}><SearchIcon /> <span>Search</span> </div>
      <div className={styles.settings}>
        <div><FilterIcon />Filter</div>
        <div><ListIcon />Sort By</div>
      </div>
      <div className={styles.projectsListContainer}>
        <ProjectModule projectData={projectsData[0]} id={`project_1`} />
        <ProjectModule projectData={projectsData[1]} id={`project_2`} />
        <ProjectModule projectData={projectsData[2]} id={`project_3`} />
        <div className={styles.endOfList}>
          It seems to be end of the list. <br />
          Try to <Link href="/match/projects">explore more</Link> to unlock more recommendations, or check the <Link href="">full list of practices.</Link>
        </div>
      </div>

      <BottomNav />

    </div>
  )
}

function ProjectModule({ projectData, id }) {

  let tagsEl = []
  projectData.tags.forEach(tag => {
    tagsEl.push(<div className={styles.tag}>{tag}</div>)
  })

  let projectContainerClass = [styles.projectContainer, styles[id]].join(" ")

  const router = useRouter()

  const onClickProject = () => {
    if (id === "project_2") {
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