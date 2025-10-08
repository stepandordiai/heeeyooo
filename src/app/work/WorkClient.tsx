"use client";

import { useEffect, useState } from "react";
import isTouchDevice from "../utils/isTouchDevice";
import Link from "next/link";
import workData from "../data/work-data.json";
import arrowIcon from "./../../../public/icons/arrow-upper-right.png";
import styles from "./Work.module.scss";

interface WorkData {
	id: string;
	name: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: {
		value: string;
		name: string;
	}[];
}

const work: WorkData[] = workData;

const WorkClient = () => {
	const [layout, setLayout] = useState("works__list");

	function handleLayout(props: string) {
		setLayout(props);
	}

	useEffect(() => {
		const work = document.querySelectorAll(`.${styles.project}`);
		let element: HTMLImageElement | null = null;

		work.forEach((project, index) => {
			project.addEventListener("mousemove", (e) => {
				// Check for touch device
				if (isTouchDevice()) return;
				const projectRect = project.getBoundingClientRect();

				// Check if the element already exists
				if (!element) {
					// Create the img element on the first mousemove event
					element = document.createElement("img");
					element.classList.add(styles["img-element"]);
					project.appendChild(element);
					element.src = workData[index].img[0];
				}

				// Update the image src only if the index changes or it's a new element
				if (element && element.src !== workData[index].img[0]) {
					element.src = workData[index].img[0];
				}

				// Calculate mouse position relative to the project element
				const event = e as MouseEvent;
				const mouseX = event.clientX - projectRect.left;
				const mouseY = event.clientY - projectRect.top;

				// Move the element based on the mouse position
				if (element) {
					element.style.top = mouseY + "px";
					element.style.left = mouseX + "px";
				}
			});

			project.addEventListener("mouseleave", () => {
				if (element) {
					element.remove();
					element = null; // Reset element
				}
			});
		});

		if (layout === "works__list") {
			const works = document.querySelectorAll(`.${styles.work}`);
			const time = 75;
			works.forEach((work, index) => {
				document.addEventListener("scroll", () => {
					const workRect = work.getBoundingClientRect();
					if (workRect.top < window.innerHeight) {
						work.classList.add(styles[`work--active`]);
					}
				});
				const workRect = work.getBoundingClientRect();
				if (workRect.top < window.innerHeight) {
					setTimeout(() => {
						work.classList.add(styles[`work--active`]);
					}, time + 75 * index);
				}
			});
		}

		if (layout === "works__grid") {
			const works = document.querySelectorAll(`.${styles["work__grid"]}`);
			const time = 75;
			works.forEach((work, index) => {
				document.addEventListener("scroll", () => {
					const workRect = work.getBoundingClientRect();
					if (workRect.top < window.innerHeight) {
						work.classList.add(styles["work--active"]);
					}
				});
				const workRect = work.getBoundingClientRect();
				if (workRect.top < window.innerHeight) {
					setTimeout(() => {
						work.classList.add(styles["work--active"]);
					}, time + 75 * index);
				}
			});
		}
	}, [layout]);
	return (
		<>
			<div>
				<p className={styles["work__sec-title"]}>
					All works <span>{work.length}</span>
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
				<div className={layout}>
					{work.map((project) => {
						return (
							<Link
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
					{work.map((project) => {
						return (
							<Link
								key={project.id}
								className={styles["work__grid"]}
								href={`/work/${project.id}`}
								data-cursor-text="See more"
							>
								<div className={styles["work__img-container"]}>
									<img
										className={styles["portfolio__img"]}
										src={project.img[0]}
										alt={project.name}
										loading="lazy"
									/>
								</div>
								<div className={styles["work__details-grid"]}>
									<p className={styles["work__name"]}>{project.name}</p>
									<img width={20} height={20} src={arrowIcon.src} alt="" />
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</>
	);
};

export default WorkClient;
