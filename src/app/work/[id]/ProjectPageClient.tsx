"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./ProjectPage.module.scss";

type Props = {
	projectName: string;
	img: string;
};

const ProjectPageClient = ({ projectName, img }: Props) => {
	const pathname = usePathname();

	useEffect(() => {
		const wrappersImg = document.querySelectorAll(
			`.${styles["project-page__img"]}`
		);

		// remove all classes initially
		wrappersImg.forEach((img) =>
			img.classList.remove(styles["project-page__img--active"])
		);

		// TODO:
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.classList.add(styles["project-page__img--active"]);
					}
				});
			},
			// if part of element is in view it fires immediately
			{
				threshold: 0,
			}
		);

		// observe each wrapper image
		wrappersImg.forEach((img) => observer.observe(img));

		return () => {
			// cleanup observer
			wrappersImg.forEach((img) => observer.unobserve(img));
		};
	}, [pathname]);

	return (
		<>
			<Image
				className={styles["project-page__img"]}
				src={img}
				alt={projectName}
				width={2560}
				height={2560}
			/>
		</>
	);
};

export default ProjectPageClient;
