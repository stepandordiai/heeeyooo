"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import works from "./../../data/work-data.json";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/Container/Container";
import WordLine from "@/app/components/WordLine/WordLine";
import PageNav from "@/app/components/PageNav/PageNav";
import styles from "./ProjectPage.module.scss";

interface WorkData {
	id: string;
	name: string;
	desc?: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: {
		value: string;
		name: string;
	}[];
	typo?: string;
}

const workData: WorkData[] = works;

const ProjectPage = () => {
	const params = useParams();
	const pathname = usePathname();

	const id = params.id;

	const project = workData.find((project) => project.id === id);

	const currentProjectIndex = workData.indexOf(project as WorkData);

	const prevProjectIndex =
		currentProjectIndex > 0 ? currentProjectIndex - 1 : workData.length - 1;

	const nexProjectIndex =
		currentProjectIndex < workData.length - 1 ? currentProjectIndex + 1 : 0;

	const nextProject = workData[nexProjectIndex];

	const prevProject = workData[prevProjectIndex];

	useEffect(() => {
		const wrappersImg = document.querySelectorAll(
			`.${styles["project-page__img"]}`
		);

		// remove all classes initially
		wrappersImg.forEach((img) =>
			img.classList.remove(styles["project-page__img--active"])
		);

		// TODO:
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.classList.add(styles["project-page__img--active"]);
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
				<Container>
					<PageNav projectName={project.name} />
					<div className={styles["project-page__title"]}>
						<WordLine text={project.name} />
					</div>
					<div className={styles["project-page__img-grid"]}>
						{project.img.map((img, index) => {
							return (
								<div
									key={index}
									className={styles["project-page__img-wrapper"]}
								>
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
					<div className={styles["project-page__palette-typo-container"]}>
						{project.palette && (
							<div
								style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
							>
								<span style={{ color: "hsl(0, 0%, 50%)" }}>Colors</span>
								<div className={styles.palette}>
									{project.palette.map((color, index) => {
										return (
											<div
												key={index}
												className={styles["palette__color"]}
												style={{ background: color.value }}
												data-color-value={color.value}
												data-color-name={color.name}
											></div>
										);
									})}
								</div>
							</div>
						)}
						{project.typo && (
							<div
								style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
							>
								<span style={{ color: "hsl(0, 0%, 50%)" }}>Typography</span>
								<div className={styles["project-page__typo-container"]}>
									<img src={project.typo} alt="" />
								</div>
							</div>
						)}
					</div>
					{project.desc && (
						<div
							style={{
								marginBottom: 10,
								display: "flex",
								flexDirection: "column",
								rowGap: 10,
							}}
						>
							<span style={{ color: "hsl(0, 0%, 50%" }}>Overview</span>
							<p>{project.desc}</p>
						</div>
					)}
					<div>
						<a
							className={styles["project-page__link"]}
							href={project.siteUrl}
							target="_blank"
						>
							Live site
						</a>
						<nav className={styles["project-page__nav"]}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: 10,
									maxWidth: "256px",
								}}
							>
								<Link
									className={styles["project-page__link"]}
									href={`/project-page/${workData[prevProjectIndex].id}`}
								>
									Previous Project
								</Link>
								<img
									style={{ borderRadius: 10 }}
									src={prevProject.img[0]}
									alt=""
								/>
							</div>

							<div
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: 10,
									maxWidth: "256px",
								}}
							>
								<Link
									className={styles["project-page__link"]}
									href={`/project-page/${workData[nexProjectIndex].id}`}
								>
									Next Project
								</Link>
								<img
									style={{ borderRadius: 10 }}
									src={nextProject.img[0]}
									alt=""
								/>
							</div>
						</nav>
					</div>
				</Container>
			</main>
		</>
	);
};

export default ProjectPage;
