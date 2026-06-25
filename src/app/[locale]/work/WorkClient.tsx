"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import work from "@/data/work.json";
import styles from "./Work.module.scss";

const layouts = [
	{ id: "grid", label: "work.grid" },
	{
		id: "list",
		label: "work.list",
	},
];

export default function WorkClient() {
	const t = useTranslations();

	const [layout, setLayout] = useState(layouts[0].id);
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
		image: number,
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
					{work.map((project, index) => {
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
					{t("work.title")} <span>{work.length}</span>
				</p>
			</div>
			<div className={styles["portfolio__btn-container"]} data-cursor-inactive>
				{layouts.map((l) => {
					return (
						<button
							key={l.id}
							className={
								layout === l.id
									? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
									: styles["portfolio__btn"]
							}
							onClick={() => handleLayout(l.id)}
						>
							<span>{t(l.label)}</span>
						</button>
					);
				})}
			</div>
			{layout === layouts[0].id && (
				<div className={styles["work-grid"]}>
					{work.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
			{layout === layouts[1].id && (
				<div className={styles["work-list"]}>
					{work.map((project, index) => {
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
											color: "rgba(255,255,255,0.5)",
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
		</>
	);
}
