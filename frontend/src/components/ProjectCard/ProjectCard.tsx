"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Project } from "@/interfaces/Project";
import { getMonthYear } from "@/utils/helpers";
import { useLocale } from "next-intl";
import { useRef } from "react";
import { isHoverDevice } from "@/utils/device";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
	project: Project;
	priority?: boolean;
	cursorTxt?: string;
};

const ProjectCard = ({
	project,
	priority = false,
	cursorTxt = "See more",
}: ProjectCardProps) => {
	const locale = useLocale();

	const imageRef = useRef<HTMLImageElement>(null);

	// TODO: learn this
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isHoverDevice()) return;

		const image = imageRef.current;
		if (!image) return;

		const rect = e.currentTarget.getBoundingClientRect();

		// Mouse position relative to the target (ref) element
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Center position of the target element
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// 8deg
		const rotateY = ((x - centerX) / centerX) * 8;
		const rotateX = -((y - centerY) / centerY) * 8;

		image.style.transform = `
			perspective(1000px)
			rotateX(${rotateX}deg)
			rotateY(${rotateY}deg)
			scale(1.05)
		`;
	};

	// TODO: learn this
	const handleMouseLeave = () => {
		if (!isHoverDevice()) return;

		const image = imageRef.current;
		if (!image) return;

		image.style.transform =
			"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
	};

	return (
		<Link
			data-cursor-text={cursorTxt}
			className={styles["project-card"]}
			href={`/work/${project.id}`}
		>
			<div
				className={styles["project-card__img-wrapper"]}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					ref={imageRef}
					className={styles["project-card__img"]}
					src={project.coverImage}
					width={2560}
					height={2560}
					alt={project.name}
					priority={priority}
				/>
			</div>
			<div className={styles["project-card__details"]}>
				<p>{project.name}</p>
				<p style={{ color: "hsl(0, 0%, 50%)" }}>
					{getMonthYear(project.date, locale)}
				</p>
			</div>
		</Link>
	);
};

export default ProjectCard;
