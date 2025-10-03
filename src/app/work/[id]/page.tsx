import type { Metadata } from "next";
import workData from "./../../data/work-data.json";
import Container from "@/app/components/Container/Container";
import ProjectPageClient from "./ProjectPageClient";
import styles from "./ProjectPage.module.scss";
import { notFound } from "next/navigation";

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

interface Params {
	params: {
		id: string;
	};
}

// TODO:
export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const project = workData.find((project) => project.id === params.id);

	if (!project) return { title: "Project Not Found" };

	return {
		title: `${project.name} • heeeyooo studio`,
		alternates: {
			canonical: `https://www.heeeyooo.studio/work/${project.id}`,
		},
	};
}

const ProjectPage = ({ params }: { params: { id: string } }) => {
	const project: WorkData | undefined = workData.find(
		(project) => project.id === params.id
	);

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
				<ProjectPageClient
					project={project}
					prevProject={prevProject}
					nextProject={nextProject}
				/>
			</Container>
		</main>
	);
};

export default ProjectPage;
