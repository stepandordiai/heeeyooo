import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/interfaces/Project";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
	project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
	return (
		<Link
			data-cursor-text="See more"
			className={styles["project-card"]}
			href={`/work/${project.id}`}
		>
			<div className={styles["project-card__img-wrapper"]}>
				<Image
					className={styles["project-card__img"]}
					src={project.img[0]}
					width={2560}
					height={2560}
					alt={project.name}
				/>
			</div>
			<div className={styles["project-card__details"]}>
				<p>{project.name}</p>
				<p style={{ color: "hsl(0, 0%, 50%)" }}>{project.date}</p>
			</div>
		</Link>
	);
};

export default ProjectCard;
