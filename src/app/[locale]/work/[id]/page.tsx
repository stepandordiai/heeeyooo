import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import ProjectPageClient from "./ProjectPageClient";
import WordLine from "@/components/WordLine/WordLine";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { notFound } from "next/navigation";
import { fetchWork } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "./ProjectPage.module.scss";

export async function generateStaticParams(): Promise<{ id: string }[]> {
	const workData = await fetchWork();

	return routing.locales.flatMap((locale) =>
		workData.map((project) => ({
			locale,
			id: project.id,
		})),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const workData = await fetchWork();
	const project = workData.find((p) => p.id === id);

	return {
		title: project
			? `${project.name} • heeeyooo studio`
			: "404 • heeeyooo studio",
	};
}

interface ProjectPageProps {
	params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const t = await getTranslations();

	const workData = await fetchWork();

	const { id } = await params;

	const project = workData.find((project) => project.id === id);

	if (!project) return notFound();

	// TODO: better to use here findIndex instead of indexOf
	const currentProjectIndex = workData.findIndex(
		(currentProject) => currentProject.id === project.id,
	);
	const prevProjectIndex =
		currentProjectIndex > 0 ? currentProjectIndex - 1 : workData.length - 1;

	const nextProjectIndex =
		currentProjectIndex < workData.length - 1 ? currentProjectIndex + 1 : 0;

	const nextProject = workData[nextProjectIndex];

	const prevProject = workData[prevProjectIndex];

	return (
		<main className={styles["project-page"]}>
			<Container>
				<Breadcrumbs
					links={[
						{ label: t("workTitle"), path: "/work" },
						{ label: project.name },
					]}
				/>
				<h1 className={styles["project-page__title"]}>
					<WordLine text={project.name} />
				</h1>
				<div className={styles["project-page__img-grid"]}>
					{project.img.map((img, index) => {
						return (
							<div key={index} className={styles["project-page__img-wrapper"]}>
								<ProjectPageClient
									projectName={project.name}
									img={img}
									index={index}
									priority={index < 2}
								/>
							</div>
						);
					})}
				</div>
				<div className={styles["project-page__info-wrapper"]}>
					{project.desc && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								rowGap: 10,
								width: "100%",
							}}
						>
							<h2 style={{ color: "hsl(0, 0%, 50%" }}>Overview</h2>
							<p>{project.desc}</p>
						</div>
					)}
					<div
						style={
							!project.typo || !project.palette
								? { gridTemplateColumns: "repeat(1, 1fr)" }
								: { gridTemplateColumns: "repeat(2, 1fr)" }
						}
						className={styles["project-page__palette-typo-container"]}
					>
						{project.palette && (
							<div
								style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
							>
								<h2 style={{ color: "hsl(0, 0%, 50%)" }}>Colors</h2>
								<div className={styles.palette}>
									{project.palette.map((hex, index) => {
										return (
											<div
												key={index}
												className={styles["palette__color"]}
												style={{ background: hex }}
												data-color-value={hex}
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
								<h2 style={{ color: "hsl(0, 0%, 50%)" }}>Typography</h2>
								<div className={styles["project-page__typo-container"]}>
									<img src={project.typo} alt="" />
								</div>
							</div>
						)}
					</div>
				</div>
				<a
					style={{ textAlign: "center" }}
					className={styles["project-page__link"]}
					href={project.siteUrl}
					target="_blank"
				>
					Live website
				</a>
				<nav className={styles["project-page__nav"]}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: 10,
						}}
					>
						<span>PREVIOUS</span>
						<ProjectCard project={prevProject} cursorTxt="Previous" />
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "flex-end",
							flexDirection: "column",
							rowGap: 10,
						}}
					>
						<span>NEXT</span>
						<ProjectCard project={nextProject} cursorTxt="Next" />
					</div>
				</nav>
			</Container>
		</main>
	);
}
