import styles from "./explore.module.sass"
import { projectsData, projectsFullData } from "@/assets/data/data";
import TopNav from "@/components/nav/topNav/topNav";
import BottomNav from "@/components/nav/bottomNav/bottomNav";
import ListIcon from "/public/icons/list.bullet.svg"
import FilterIcon from "/public/icons/slider.horizontal.3.svg"
import SearchIcon from "/public/icons/magnifyingglass.svg"
import Link from "next/link";
import ProjectModule from "@/components/projectModule/projectModule";
import { useStore } from "@/utils/store";
import Image from "next/image";
import Project from "../project";
import { useState } from "react";

export default function Explore() {


  return (
    <div className={styles.container}>

      <div className={styles.scrollContainer}>

        <div className={styles.welcome}>
          <p>Good afternoon, Leonardo,</p>
          <h1>Open Creations is made for those who believe in global collaboration.</h1>
        </div>

        <div className={styles.search}><SearchIcon /> <span>Search</span> </div>
        <div className={styles.settings}>
          <div><FilterIcon />Filter</div>
          <div><ListIcon />Sort By</div>
        </div>

        <div className={styles.label}>
          <div className={styles.title}>Global</div>
          <div className={styles.more}>View more</div>
        </div>

        <Link href="/project?type=song">
          <ProjectModule projectData={projectsData[0]} id={`project_1`} />
        </Link>

        <ProjectModule projectData={projectsData[1]} id={`project_2`} />

        <div className={styles.label}>
          <div className={styles.title}>Local</div>
          <div className={styles.more}>View more</div>
        </div>

        <ProjectModule projectData={projectsData[2]} id={`project_3`} />

      </div>

      <BottomNav />

    </div>

  )
}