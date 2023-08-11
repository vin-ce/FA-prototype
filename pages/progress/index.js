import styles from "./progress.module.sass"

import BottomNav from "@/components/nav/bottomNav/bottomNav"
import ProjectModule from "@/components/projectModule/projectModule"
import { simplifiedProjectData } from "@/assets/data/data";
import { useStore } from "@/utils/store"
import { useRouter } from "next/router"

import Link from "next/link";


export default function Progress() {

  const router = useRouter()

  return (
    <div className={styles.container}>

      <div className={styles.scrollContainer}>

        <div className={styles.label}>
          <div className={styles.title}>Ongoing</div>
          <div className={styles.more}>View more</div>
        </div>

        <Link href="/project?type=crenshaw">
          <ProjectModule projectData={simplifiedProjectData[0]} id={`project_1`} />
        </Link>

        <ProjectModule projectData={simplifiedProjectData[1]} id={`project_2`} />

        <div className={styles.label}>
          <div className={styles.title}>Completed</div>
          <div className={styles.more}>View more</div>
        </div>

        <ProjectModule projectData={simplifiedProjectData[2]} id={`project_3`} />
        <ProjectModule projectData={simplifiedProjectData[3]} id={`project_4`} />

      </div>

      <BottomNav />

    </div>
  )
}