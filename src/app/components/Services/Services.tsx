"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import servicesData from "./../../data/services-data.json";
import WordLine from "../WordLine/WordLine";
import img from "./../../../../public/neresen-c.png";
import img2 from "./../../../../public/neresen-ss-v6-c.png";
import styles from "./Services.module.scss";

const Services = () => {
	const [device, setDevice] = useState("mobile");
	const [indicatorStyle, setIndicatorStyle] = useState({});
	const [dividerActive, setDividerActive] = useState(
		new Array(servicesData.length).fill(false)
	);
	const [rangeValue, setRangeValue] = useState(50);

	const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);

	const btnIndicator = useRef(null);

	useEffect(() => {
		if (!dividerRefs.current.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = dividerRefs.current.indexOf(
						entry.target as HTMLDivElement
					);

					if (index !== -1 && entry.isIntersecting) {
						setDividerActive((prev) => {
							if (prev[index]) return prev;
							const updated = [...prev];
							updated[index] = true;
							return updated;
						});
					}
				});
			},
			{ threshold: 1 }
		);

		dividerRefs.current.forEach((divider) => {
			if (divider) observer.observe(divider);
		});

		return () => observer.disconnect();
	}, []);

	// FIXME:
	useEffect(() => {
		const btn = document.querySelector(
			`.${styles["portfolio-btn--active"]}`
		) as HTMLButtonElement;

		if (btnIndicator.current && btn) {
			setIndicatorStyle({
				width: btn.offsetWidth + "px",
				left: btn.offsetLeft + "px",
			});
		}
	}, [device]);

	return (
		<div className={styles.services}>
			<h2 className={styles["services__title"]}>
				<WordLine text="Services" />
			</h2>
			<div className={styles["services__desc"]}>
				<WordLine text="We specialize in crafting websites from idea, through design to development and post-deployment follow-up support." />
			</div>
			<div className={styles["home__services-grid"]}>
				{servicesData.map((service, index) => {
					return (
						<React.Fragment key={service.id}>
							<div className={styles["service"]}>
								<div className={styles["service__title"]}>
									<WordLine text={service.title} />
								</div>
								<div className={styles["service__desc"]}>
									<WordLine text={service.desc} />
									{service.performanceOverview && (
										<div
											style={{
												marginTop: 20,
												border: "2px solid rgba(255, 255, 255, 0.15)",
												padding: 10,
												borderRadius: 15,
											}}
										>
											<p style={{ fontWeight: 500 }}>
												Current website performance
											</p>
											<div
												className={styles["portfolio__btn-container"]}
												data-cursor-inactive
											>
												<div
													className={styles["btn-indicator"]}
													ref={btnIndicator}
													style={indicatorStyle}
												></div>
												<button
													className={
														device === "mobile"
															? `${styles["btn"]} ${styles["portfolio__btn--active"]}`
															: styles["btn"]
													}
													onClick={() => setDevice("mobile")}
												>
													<span
														style={
															device === "mobile"
																? { color: "#000" }
																: { color: "#fff" }
														}
													>
														Mobile
													</span>
												</button>
												<button
													className={
														device === "desktop"
															? `${styles["btn"]} ${styles["portfolio__btn--active"]}`
															: styles["btn"]
													}
													onClick={() => setDevice("desktop")}
												>
													<span
														style={
															device === "desktop"
																? { color: "#000" }
																: { color: "#fff" }
														}
													>
														Desktop
													</span>
												</button>
											</div>
											{device === "mobile" && (
												<div className={styles["circles-container"]}>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "81%" } as React.CSSProperties
															}
															data-value={81}
														></div>
														<span>Performance</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "91%" } as React.CSSProperties
															}
															data-value={91}
														></div>
														<span>Accessibility</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "100%" } as React.CSSProperties
															}
															data-value={100}
														></div>
														<span>Best Practices</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "100%" } as React.CSSProperties
															}
															data-value={100}
														></div>
														<span>SEO</span>
													</div>
												</div>
											)}
											{device === "desktop" && (
												<div className={styles["circles-container"]}>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "80%" } as React.CSSProperties
															}
															data-value={80}
														></div>
														<span>Performance</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "91%" } as React.CSSProperties
															}
															data-value={91}
														></div>
														<span>Accessibility</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "100%" } as React.CSSProperties
															}
															data-value={100}
														></div>
														<span>Best Practices</span>
													</div>
													<div className={styles["circle-container"]}>
														<div
															className={styles["circle"]}
															style={
																{ "--value": "100%" } as React.CSSProperties
															}
															data-value={100}
														></div>
														<span>SEO</span>
													</div>
												</div>
											)}
										</div>
									)}
									{service.beforeAfter && (
										<div className={styles["img-container"]}>
											<div
												className={styles["img-line"]}
												style={{ left: rangeValue + "%" }}
											></div>
											<img className={styles["img"]} src={img.src} alt="" />
											<img
												className={styles["img-range"]}
												src={img2.src}
												alt=""
												style={{
													clipPath: `polygon(${rangeValue}% 0, 100% 0, 100% 100%, ${rangeValue}% 100%)`,
												}}
											/>
											<input
												onChange={(e) => setRangeValue(Number(e.target.value))}
												type="range"
												max={100}
												value={rangeValue}
												step={1}
												name=""
												id=""
											/>
										</div>
									)}
								</div>
							</div>
							<div
								ref={(el) => {
									dividerRefs.current[index] = el;
								}}
								className={`${styles["service__divider"]} ${
									dividerActive[index] ? styles["service__divider--active"] : ""
								}`}
							></div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Services;
