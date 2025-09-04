import { ReactNode, useEffect } from "react";
import React from "react";
// import { useParams } from "react-router-dom";
import styles from "./WordLine.module.scss";

const WordLine = (props: any) => {
	// const { lng } = useParams();

	useEffect(() => {
		const words = document.querySelectorAll(".word-line");

		words.forEach((word) => {
			document.addEventListener("scroll", () => {
				if (!words) return;
				const wordRect = word.getBoundingClientRect();

				if (wordRect.top < window.innerHeight) {
					word.classList.add("word-line--active");
				} else {
					word.classList.remove("word-line--active");
				}
			});

			if (!words) return;
			const wordRect = word.getBoundingClientRect();

			if (wordRect.top < window.innerHeight) {
				word.classList.add("word-line--active");
			} else {
				word.classList.remove("word-line--active");
			}
		});
	}, []);
	return (
		<>
			{String(props.children)
				.split(" ")
				.map((word, index) => {
					return (
						<React.Fragment key={index}>
							<div className="word-line-wrapper">
								<div className="word-line">{word}</div>
							</div>
						</React.Fragment>
					);
				})}
		</>
	);
};

export default WordLine;
