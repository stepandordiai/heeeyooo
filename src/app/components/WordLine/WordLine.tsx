"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import styles from "./WordLine.module.scss";

type WordLineProps = {
	text: string;
};

// TODO: props is always an object
const WordLine = ({ text }: WordLineProps) => {
	const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

	const [wordActive, setWordActive] = useState(
		new Array(wordRefs.current.length).fill(false)
	);

	useEffect(() => {
		if (!wordRefs.current.length) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const index = wordRefs.current.indexOf(entry.target as HTMLDivElement);
				if (index !== -1 && entry.isIntersecting) {
					setWordActive((prev) => {
						if (prev[index]) return prev;
						const updated = [...prev];
						updated[index] = true;
						return updated;
					});
				}
			});
		});

		wordRefs.current.forEach((word) => {
			if (word) observer.observe(word);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className={styles["word-line-container"]}>
			{text.split(" ").map((word, index) => {
				return (
					<React.Fragment key={index}>
						<div className={styles["word-line-wrapper"]}>
							<div
								ref={(el) => {
									wordRefs.current[index] = el;
								}}
								className={`${styles["word-line"]} ${
									wordActive[index] ? styles["word-line--active"] : ""
								}`}
							>
								{word}
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default WordLine;
