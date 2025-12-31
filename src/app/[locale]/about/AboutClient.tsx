"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./About.module.scss";

const AboutClient = () => {
	const [popUpActive, setPopUpActive] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setPopUpActive(true), 1000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<span
			className={classNames(styles["about__pop-up"], {
				[styles["about__pop-up--active"]]: popUpActive,
			})}
		>
			<span>Page under construction.</span>
			<button
				className={styles["about__pop-up-btn"]}
				onClick={() => setPopUpActive(false)}
			>
				Okay!
			</button>
		</span>
	);
};

export default AboutClient;
