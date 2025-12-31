"use client";

import { useEffect, useState, useRef } from "react";
import { Project } from "@/app/interfaces/Project";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";
import styles from "./Work.module.scss";

type WorkClientProps = {
	workData: Project[];
};

const WorkClient = ({ workData }: WorkClientProps) => {
	const [layout, setLayout] = useState("works__list");
	const [image, setImage] = useState(0);
	const [active, setActive] = useState(false);
	const [touchDevice, setTouchDevice] = useState(false);

	useEffect(() => {
		setTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
	}, []);

	const floatImages = useRef<HTMLDivElement[]>([]);
	const floatImageContainer = useRef<HTMLDivElement>(null);

	const handleFloatImage = (
		e: React.MouseEvent<HTMLAnchorElement>,
		bool: boolean,
		image: number
	) => {
		if (floatImageContainer.current && !touchDevice) {
			floatImageContainer.current.style.top = e.clientY + "px";
			floatImageContainer.current.style.left = e.clientX + "px";
		}

		setImage(image);
		setActive(bool);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			floatImages.current[image]?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}, 10);

		return () => clearTimeout(timeout);
	}, [image]);

	function handleLayout(props: string) {
		setLayout(props);
	}

	return (
		<>
			{!touchDevice && (
				<div
					ref={floatImageContainer}
					className={styles["float-image-container"]}
					style={{
						opacity: `${active ? 1 : 0}`,
						transform: `translate(-50%, -50%) scale(${active ? 1 : 0})`,
						transition: "all 0.2s ease-out",
					}}
				>
					{workData.map((project, index) => {
						return (
							<img
								ref={(el) => {
									if (el) floatImages.current[index] = el;
								}}
								className={styles["float-image"]}
								key={project.id}
								src={project.img[0]}
							></img>
						);
					})}
				</div>
			)}
			<div>
				<p className={styles["work__sec-title"]}>
					All works <span>{workData.length}</span>
				</p>
			</div>
			<div className={styles["portfolio__btn-container"]} data-cursor-inactive>
				<button
					className={
						layout === "works__list"
							? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
							: styles["portfolio__btn"]
					}
					onClick={() => handleLayout("works__list")}
				>
					<span>List</span>
				</button>
				<button
					className={
						layout === "works__grid"
							? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
							: styles["portfolio__btn"]
					}
					onClick={() => handleLayout("works__grid")}
				>
					<span>Grid</span>
				</button>
			</div>
			{layout === "works__list" && (
				<div className={styles[layout]}>
					{workData.map((project, index) => {
						return (
							<Link
								onMouseEnter={(e) => handleFloatImage(e, true, index)}
								onMouseMove={(e) => handleFloatImage(e, true, index)}
								onMouseLeave={(e) => handleFloatImage(e, false, index)}
								key={project.id}
								data-cursor-inactive
								className={styles.project}
								href={`/work/${project.id}`}
							>
								<p className={styles["work__name"]}>{project.name}</p>
								<div className={styles["work__desc"]}>
									<p
										className={styles["work__date"]}
										style={{
											fontWeight: 300,
											color: "rgba(255,255,255,0.5",
										}}
									>
										{project.date}
									</p>
									<p>Design & Development</p>
								</div>
							</Link>
						);
					})}
				</div>
			)}
			{layout === "works__grid" && (
				<div className={styles[layout]}>
					{workData.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</>
	);
};

export default WorkClient;
