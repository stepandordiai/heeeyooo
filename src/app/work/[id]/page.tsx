import type { Metadata } from "next";
import workData from "./../../data/work-data.json";
import Container from "@/app/components/Container/Container";
import ProjectPageClient from "./ProjectPageClient";
import { notFound } from "next/navigation";
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

const work = workData as WorkData[];

// TODO:
export async function generateStaticParams(): Promise<{ id: string }[]> {
	return work.map((project) => ({ id: project.id }));
}

// TODO:
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const project = work.find((p) => p.id === id);

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
	const { id } = await params;

	const project = work.find((project) => project.id === id);

	if (!project) return notFound();

	// TODO: better to use here findIndex instead of indexOf
	const currentProjectIndex = work.findIndex(
		(currentProject) => currentProject.id === project.id
	);
	const prevProjectIndex =
		currentProjectIndex > 0 ? currentProjectIndex - 1 : work.length - 1;

	const nextProjectIndex =
		currentProjectIndex < work.length - 1 ? currentProjectIndex + 1 : 0;

	const nextProject = work[nextProjectIndex];

	const prevProject = work[prevProjectIndex];

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
