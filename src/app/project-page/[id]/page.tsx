"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import works from "./../../data/work-data.json";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectPage.module.scss";

interface WorkData {
	id: string;
	name: string;
	desc?: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: string[];
}

const workData: WorkData[] = works;

const ProjectPage = () => {
	const params = useParams();
	const pathname = usePathname();

	const id = params.id;

	const project = workData.find((project) => project.id === id);

	const currentProjectIndex = workData.indexOf(project as WorkData);

	const nexProjectIndex =
		currentProjectIndex < workData.length - 1 ? currentProjectIndex + 1 : 0;

	useEffect(() => {
		const wrappersImg = document.querySelectorAll(
			`.${styles["project-page__img"]}`
		);

		// remove all classes initially
		wrappersImg.forEach((img) =>
			img.classList.remove(styles["project-page__img-wrapper--active"])
		);

		// TODO:

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.classList.add(styles["project-page__img-wrapper--active"]);
					}
				});
			},
			// if part of element is in view it fires immediately
			{
				threshold: 0,
			}
		);

		// observe each wrapper image
		wrappersImg.forEach((img) => observer.observe(img));

		return () => {
			// cleanup observer
			wrappersImg.forEach((img) => observer.unobserve(img));
		};
	}, [pathname]);

	if (!project) return;

	return (
		<>
			<Head>
				<title>{project.name} &bull; heeeyooo studio</title>
			</Head>
			<main className={styles["project-page"]}>
				<div style={{ marginBottom: 20 }}>
					<Link className={styles["page-nav__link"]} href="/work">
						All work
					</Link>{" "}
					&bull; <span style={{ color: "hsl(0, 0%, 50%)" }}>Project</span>
				</div>
				<h2 className={styles["project-page__title"]}>{project?.name}</h2>
				<div className={styles["project-page__img-grid"]}>
					{project.img.map((img, index) => {
						return (
							<div key={index} className={styles["project-page__img-wrapper"]}>
								<Image
									className={styles["project-page__img"]}
									src={img}
									alt={project.name}
									fill
								/>
							</div>
						);
					})}
				</div>
				{project.palette && (
					<div className={styles.palette}>
						{project.palette.map((color, index) => {
							return (
								<div
									key={index}
									className={styles["palette__color"]}
									style={{ background: color, width: "100%", height: 200 }}
									data-color={color}
								></div>
							);
						})}
					</div>
				)}
				<div>
					<span style={{ color: "hsl(0, 0%, 50%" }}>Overview</span>
					{project.desc && <p>{project.desc}</p>}
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<a
						className={styles["project-page__link"]}
						href={project.siteUrl}
						target="_blank"
					>
						Live site
					</a>
					<Link
						className={styles["project-page__link"]}
						href={`/project-page/${workData[nexProjectIndex].id}`}
					>
						Next Project
					</Link>
				</div>
			</main>
		</>
	);
};

export default ProjectPage;
