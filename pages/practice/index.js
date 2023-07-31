import styles from "./practice.module.sass"
import { projectsData } from "@/assets/data/data";
import TopNav from "@/components/nav/topNav/topNav";
import BottomNav from "@/components/nav/bottomNav/bottomNav";
import ListIcon from "@/assets/icons/list.bullet.svg"
import FilterIcon from "@/assets/icons/slider.horizontal.3.svg"
import SearchIcon from "@/assets/icons/magnifyingglass.svg"
import Link from "next/link";

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
        <ProjectModule projectData={projectsData[0]} />
        <ProjectModule projectData={projectsData[1]} />
        <ProjectModule projectData={projectsData[2]} />
        <div className={styles.endOfList}>
          It seems to be end of the list. <br />
          Try to <Link href="/match?type=projects">explore more</Link> to unlock more recommendations, or check the <Link href="">full list of practices.</Link>
        </div>
      </div>

      <BottomNav />

    </div>
  )
}

function ProjectModule({ projectData }) {

  let tagsEl = []
  projectData.tags.forEach(tag => {
    tagsEl.push(<div className={styles.tag}>{tag}</div>)
  })

  let projectContainerClass = styles.projectContainer
  if (projectData.tags[0] === "Internship") projectContainerClass = [projectContainerClass, styles.internship].join(' ')
  else if (projectData.tags[0] === "Project") projectContainerClass = [projectContainerClass, styles.project].join(' ')

  return (
    <div className={projectContainerClass}>
      <div className={styles.title}>{projectData.title}</div>
      <div className={styles.dates}>
        {projectData.start} - {projectData.end}
      </div>
      <div className={styles.tags}>{tagsEl}</div>
    </div>
  )

}