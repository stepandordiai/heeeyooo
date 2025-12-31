"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProjectPage.module.scss";

type ProjectPageClientProps = {
	projectName: string;
	img: string;
	index: number;
};

const ProjectPageClient = ({
	projectName,
	img,
	index,
}: ProjectPageClientProps) => {
	const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

	const [imgActive, setImgActive] = useState(
		new Array(imgRefs.current.length).fill(false)
	);

	useEffect(() => {
		const wrappersImg = document.querySelectorAll(
			`.${styles["project-page__img"]}`
		);

		// remove all classes initially
		wrappersImg.forEach((img) =>
			img.classList.remove(styles["project-page__img--active"])
		);

		if (!imgRefs.current.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = imgRefs.current.indexOf(
						entry.target as HTMLImageElement
					);
					if (index !== -1 && entry.isIntersecting) {
						setImgActive((prev) => {
							if (prev[index]) return prev;
							const updated = [...prev];
							updated[index] = true;
							return updated;
						});
					}
				});
			},
			// if part of element is in view it fires immediately
			{
				threshold: 0,
			}
		);

		imgRefs.current.forEach((img) => {
			if (img) observer.observe(img);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<Image
			ref={(el) => {
				imgRefs.current[index] = el;
			}}
			className={`${styles["project-page__img"]} ${
				imgActive[index] ? styles["project-page__img--active"] : ""
			}`}
			src={img}
			alt={projectName}
			width={2560}
			height={2560}
		/>
	);
};

export default ProjectPageClient;
