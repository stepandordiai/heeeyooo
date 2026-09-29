"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import work from "@/data/work.json";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import { getMonthYear } from "@/utils/helpers";
import { useLocale } from "next-intl";
import styles from "./Work.module.scss";

export default function WorkClient() {
	const [layout, setLayout] = useState("grid");
	const [image, setImage] = useState(0);
	const [active, setActive] = useState(false);
	const [touchDevice, setTouchDevice] = useState(false);

	const floatImages = useRef<HTMLDivElement[]>([]);
	const floatImageContainer = useRef<HTMLDivElement>(null);

	const locale = useLocale();

	useEffect(() => {
		setTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
	}, []);

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
					{work
						.toSorted(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
						)
						.map((project, index) => {
							return (
								<div
									key={project.id}
									className={styles["work__float-img-wrapper"]}
								>
									<img
										ref={(el) => {
											if (el) floatImages.current[index] = el;
										}}
										className={styles["float-image"]}
										src={project.coverImage}
									></img>
								</div>
							);
						})}
				</div>
			)}
			<div className={styles["portfolio__btn-container"]} data-cursor-inactive>
				<button
					className={
						layout === "grid"
							? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
							: styles["portfolio__btn"]
					}
					onClick={() => handleLayout("grid")}
				>
					<GridIcon />
				</button>
				<button
					className={
						layout === "list"
							? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
							: styles["portfolio__btn"]
					}
					onClick={() => handleLayout("list")}
				>
					<ListIcon />
				</button>
			</div>
			{layout === "grid" && (
				<div className={styles["work-grid"]}>
					{work
						.toSorted(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
						)
						.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
				</div>
			)}
			{layout === "list" && (
				<div className={styles["work-list"]}>
					{work
						.toSorted(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
						)
						.map((project, index) => {
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
											{getMonthYear(project.date, locale)}
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
