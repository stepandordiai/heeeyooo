"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import servicesData from "@/data/services-data.json";
import Image from "next/image";
import classNames from "classnames";
import WordLine from "../../WordLine/WordLine";
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

export default function ServicesClient() {
	const t = useTranslations("services");
	const [device, setDevice] = useState(websitePerformance[0].device);
	const [indicatorStyle, setIndicatorStyle] = useState({});
	const [rangeValue, setRangeValue] = useState(50);

	const btnIndicator = useRef(null);

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
		<div className={styles["home__services-grid"]}>
			{servicesData.map((service, index) => {
				return (
					<Fragment key={index}>
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
											{t("websiteOptimization.currentOptimization")}
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
											{t("websiteRedesign.redesignShowcase")}
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
												alt="Website design before redesign"
											/>
											<Image
												style={{
													clipPath: `polygon(${rangeValue}% 0, 100% 0, 100% 100%, ${rangeValue}% 100%)`,
												}}
												className={styles["img-range"]}
												src="/neresen-ss-v7-c-after.png"
												width={2560}
												height={1440}
												alt="Website design after redesign"
											/>
											<input
												onChange={(e) => setRangeValue(Number(e.target.value))}
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
											({t("websiteMaintenance.bonusDesc")})
										</p>
									</>
								)}
							</div>
						</div>
						<div
							ref={(el) => {
								if (!el) return;
								const observer = new IntersectionObserver(
									([entry]) => {
										if (entry.isIntersecting) {
											el.classList.add(styles["service__divider--active"]);
											observer.disconnect();
										}
									},
									{ threshold: 1 },
								);
								observer.observe(el);
							}}
							className={styles["service__divider"]}
						/>
					</Fragment>
				);
			})}
		</div>
	);
}
