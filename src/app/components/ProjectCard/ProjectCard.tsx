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
				<p className={styles["project-card__name"]}>{project.name}</p>
				<p className={styles["project-card__date"]}>{project.date}</p>
			</div>
		</Link>
	);
};

export default ProjectCard;
