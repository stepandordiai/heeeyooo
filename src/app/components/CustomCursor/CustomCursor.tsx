"use client";

import { useEffect, useRef, useState } from "react";
import isTouchDevice from "@/app/utils/isTouchDevice";
import styles from "./CustomCursor.module.scss";

const CustomCursor = () => {
	const customCursor = useRef<HTMLDivElement | null>(null);

	const [active, setActive] = useState(false);
	const [text, setText] = useState("");

	useEffect(() => {
		if (isTouchDevice()) return;

		const handleMouseMove = (e: MouseEvent) => {
			const inactiveTarget = (e?.target as HTMLElement).closest(
				"[data-cursor-inactive]"
			);
			if (!customCursor.current) return;
			if (inactiveTarget) {
				// Hide cursor completely for these elements
				customCursor.current.classList.remove(styles["custom-cursor--show"]);
				return; // stop further processing
			}

			customCursor.current.classList.add(styles["custom-cursor--show"]);
			const x = e.clientX;
			const y = e.clientY;

			customCursor.current.style.left = x + "px";
			customCursor.current.style.top = y + "px";
		};

		const handleMouseLeave = (e: MouseEvent | null) => {
			// TODO:
			const inactiveTarget = e?.currentTarget as HTMLElement; // the element with data-cursor-inactive
			const toElement = e?.relatedTarget as HTMLElement; // where the mouse goes after leaving

			if (!customCursor.current) return;
			if (!inactiveTarget.contains(toElement)) {
				// mouse left completely, not just moving inside children
				customCursor.current.classList.remove(styles["custom-cursor--show"]);
			} else {
				// still inside -> keep cursor visible
				customCursor.current.classList.add(styles["custom-cursor--show"]);
			}
		};

		const activeCursor = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest("[data-cursor-text]");

			if (target) {
				setActive(true);
				setText(target.getAttribute("data-cursor-text") ?? "");
			}
		};

		const inactiveCursor = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest("[data-cursor-text]");

			if (target) {
				setActive(false);
				setText("");
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseover", activeCursor);
		document.addEventListener("mouseout", inactiveCursor);
		document.addEventListener("click", inactiveCursor);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseover", activeCursor);
			document.removeEventListener("mouseout", inactiveCursor);
			document.removeEventListener("click", inactiveCursor);
		};
	}, []);

	return (
		<div
			ref={customCursor}
			className={`${styles["custom-cursor"]} ${
				active ? `${styles["custom-cursor--active"]}` : ""
			}`}
		>
			{text && <span>{text}</span>}
		</div>
	);
};

export default CustomCursor;
