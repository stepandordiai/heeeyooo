import { ReactNode, useEffect } from "react";
import React from "react";
import styles from "./WordLine.module.scss";

interface WordLineProps {
	text: string;
}

// TODO: props is always an object
const WordLine = ({ text }: WordLineProps) => {
	useEffect(() => {
		const words = document.querySelectorAll(`.${styles["word-line"]}`);

		words.forEach((word) => {
			document.addEventListener("scroll", () => {
				if (!words) return;
				const wordRect = word.getBoundingClientRect();

				if (wordRect.top < window.innerHeight) {
					word.classList.add(styles["word-line--active"]);
				} else {
					word.classList.remove(styles["word-line--active"]);
				}
			});

			if (!words) return;
			const wordRect = word.getBoundingClientRect();

			if (wordRect.top < window.innerHeight) {
				word.classList.add(styles["word-line--active"]);
			} else {
				word.classList.remove(styles["word-line--active"]);
			}
		});
	}, []);
	return (
		<>
			{text.split(" ").map((word, index) => {
				return (
					<React.Fragment key={index}>
						<div className={styles["word-line-wrapper"]}>
							<div className={styles["word-line"]}>{word}</div>
						</div>
					</React.Fragment>
				);
			})}
		</>
	);
};

export default WordLine;
