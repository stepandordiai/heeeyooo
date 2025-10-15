import type { Metadata } from "next";
import Container from "@/app/components/Container/Container";
import ProjectPageClient from "./ProjectPageClient";
import Link from "next/link";
import WordLine from "@/app/components/WordLine/WordLine";
import PageNav from "@/app/components/PageNav/PageNav";
import { notFound } from "next/navigation";
import { Project } from "@/app/interfaces/Project";
import styles from "./ProjectPage.module.scss";

// TODO:
const url = process.env.API_URL!;
const headers = {
	"X-SILO-KEY": process.env.API_KEY!,
	"Content-Type": "application/json",
};

// TODO:
const getWorkData = async (): Promise<Project[]> => {
	const response = await fetch(url, { headers, next: { revalidate: 60 } });
	return response.json();
};

// TODO:
export async function generateStaticParams(): Promise<{ id: string }[]> {
	const workData = await getWorkData();
	return workData.map((project) => ({ id: project.id }));
}

// TODO:
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const workData = await getWorkData();
	const project = workData.find((p) => p.id === id);

	if (!project) {
		return { title: "Project Not Found • heeeyooo studio" };
	}

	return {
		title: `${project.name} • heeeyooo studio`,
	};
}

interface ProjectPageProps {
	params: Promise<{ id: string }>;
}

// TODO:
const ProjectPage = async ({ params }: ProjectPageProps) => {
	const workData = await getWorkData();

	const { id } = await params;

	const project = workData.find((project) => project.id === id);

	if (!project) return notFound();

	// TODO: better to use here findIndex instead of indexOf
	const currentProjectIndex = workData.findIndex(
		(currentProject) => currentProject.id === project.id
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
				<PageNav pageName="Work" projectName={project.name} />
				<div className={styles["project-page__title"]}>
					<WordLine text={project.name} />
				</div>
				<div className={styles["project-page__img-grid"]}>
					{project.img.map((img, index) => {
						return (
							<div key={index} className={styles["project-page__img-wrapper"]}>
								<ProjectPageClient projectName={project.name} img={img} />
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
								href={`/work/${prevProject.id}`}
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
								href={`/work/${nextProject.id}`}
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
	);
};

export default ProjectPage;
