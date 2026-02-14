"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import React from "react";
import servicesData from "@/app/data/services-data.json";
import WordLine from "../../WordLine/WordLine";
import Image from "next/image";
import classNames from "classnames";
import styles from "./Services.module.scss";

const websitePerformance = [
	{
		device: "Mobile",
		performance: 94,
		accessibility: 91,
		bestPractices: 100,
		seo: 100,
	},
	{
		device: "Desktop",
		performance: 100,
		accessibility: 91,
		bestPractices: 100,
		seo: 100,
	},
];

const Services = () => {
	const t = useTranslations();
	const [device, setDevice] = useState(websitePerformance[0].device);
	const [indicatorStyle, setIndicatorStyle] = useState({});
	const [dividerActive, setDividerActive] = useState(
		new Array(servicesData.length).fill(false),
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
						entry.target as HTMLDivElement,
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
			{ threshold: 1 },
		);

		dividerRefs.current.forEach((divider) => {
			if (divider) observer.observe(divider);
		});

		return () => observer.disconnect();
	}, []);

	// FIXME:
	useEffect(() => {
		const btn = document.querySelector(
			`.${styles["portfolio-btn--active"]}`,
		) as HTMLButtonElement;

		if (btnIndicator.current && btn) {
			setIndicatorStyle({
				width: btn.offsetWidth + "px",
				left: btn.offsetLeft + "px",
			});
		}
	}, [device]);

	const currentDevice = websitePerformance.find(
		(item) => item.device === device,
	);

	return (
		<div className={styles.services}>
			<h2 className={styles["services__title"]}>
				<WordLine text={t("home.services")} />
			</h2>
			<div className={styles["services__desc"]}>
				<WordLine text={t("home.servicesDesc")} />
			</div>
			<div className={styles["home__services-grid"]}>
				{servicesData.map((service, index) => {
					return (
						<React.Fragment key={service.id}>
							<div className={styles["service"]}>
								<h3 className={styles["service__title"]}>
									<WordLine text={t(service.title)} />
								</h3>
								<div className={styles["service__desc"]}>
									<WordLine text={t(service.desc)} />
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
												{websitePerformance.map((el) => {
													return (
														<button
															key={el.device}
															className={
																device === el.device
																	? `${styles["btn"]} ${styles["portfolio__btn--active"]}`
																	: styles["btn"]
															}
															onClick={() => setDevice(el.device)}
														>
															<span
																style={
																	device === el.device
																		? { color: "#000" }
																		: { color: "#fff" }
																}
															>
																{el.device}
															</span>
														</button>
													);
												})}
											</div>
											<div className={styles["circles-container"]}>
												<div className={styles["circle-container"]}>
													<div
														className={classNames(styles["circle"], {
															[styles["circle--active"]]:
																device === currentDevice?.device,
														})}
														style={
															{
																"--value": `${currentDevice?.performance}%`,
															} as React.CSSProperties
														}
														data-value={currentDevice?.performance}
													></div>
													<span>Performance</span>
												</div>
												<div className={styles["circle-container"]}>
													<div
														className={classNames(styles["circle"], {
															[styles["circle--active"]]:
																device === currentDevice?.device,
														})}
														style={
															{
																"--value": `${currentDevice?.accessibility}%`,
															} as React.CSSProperties
														}
														data-value={currentDevice?.accessibility}
													></div>
													<span>Accessibility</span>
												</div>
												<div className={styles["circle-container"]}>
													<div
														className={classNames(styles["circle"], {
															[styles["circle--active"]]:
																device === currentDevice?.device,
														})}
														style={
															{
																"--value": `${currentDevice?.bestPractices}%`,
															} as React.CSSProperties
														}
														data-value={currentDevice?.bestPractices}
													></div>
													<span>Best Practices</span>
												</div>
												<div className={styles["circle-container"]}>
													<div
														className={classNames(styles["circle"], {
															[styles["circle--active"]]:
																device === currentDevice?.device,
														})}
														style={
															{
																"--value": `${currentDevice?.seo}%`,
															} as React.CSSProperties
														}
														data-value={currentDevice?.seo}
													></div>
													<span>SEO</span>
												</div>
											</div>
										</div>
									)}
									{service.beforeAfter && (
										<div
											style={{
												marginTop: 20,
												border: "2px solid rgba(255, 255, 255, 0.15)",
												padding: 10,
												borderRadius: 15,
											}}
										>
											<p style={{ fontWeight: 500, marginBottom: 10 }}>
												Redesign showcase
											</p>
											<div className={styles["img-container"]}>
												<div
													className={styles["img-line"]}
													style={{ left: rangeValue + "%" }}
												></div>
												<Image
													className={styles["img"]}
													src="/neresen-ss-c-before.png"
													width={2560}
													height={1440}
													alt="Before"
												/>
												<Image
													style={{
														clipPath: `polygon(${rangeValue}% 0, 100% 0, 100% 100%, ${rangeValue}% 100%)`,
													}}
													className={styles["img-range"]}
													src="/neresen-ss-v7-c-after.png"
													width={2560}
													height={1440}
													alt="After"
												/>
												<input
													onChange={(e) =>
														setRangeValue(Number(e.target.value))
													}
													type="range"
													max={100}
													value={rangeValue}
													step={1}
													// TODO: learn this
													aria-label="Before and after comparison"
												/>
											</div>
										</div>
									)}
									{service.freeSupport && (
										<>
											<br />
											<p style={{ color: "var(--accent-clr)" }}>
												(Our service includes 3 months of free minor support and
												maintenance following the website’s delivery.)
											</p>
										</>
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
