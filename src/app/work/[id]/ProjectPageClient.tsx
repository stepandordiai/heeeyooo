"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import WordLine from "@/app/components/WordLine/WordLine";
import Link from "next/link";
import Image from "next/image";
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
	palette?: { value: string; name: string }[];
	typo?: string;
}

interface Props {
	project: WorkData;
	prevProject: WorkData;
	nextProject: WorkData;
}

const ProjectPageClient = ({ project, prevProject, nextProject }: Props) => {
	const pathname = usePathname();

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
			<PageNav pageName="Work" projectName={project.name} />
			<div className={styles["project-page__title"]}>
				<WordLine text={project.name} />
			</div>
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
			<div className={styles["project-page__palette-typo-container"]}>
				{project.palette && (
					<div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
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
					<div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
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
							href={`/work/${prevProject.id}`}
						>
							Previous Project
						</Link>
						<img style={{ borderRadius: 10 }} src={prevProject.img[0]} alt="" />
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
							href={`/work/${nextProject.id}`}
						>
							Next Project
						</Link>
						<img style={{ borderRadius: 10 }} src={nextProject.img[0]} alt="" />
					</div>
				</nav>
			</div>
		</>
	);
};

export default ProjectPageClient;
