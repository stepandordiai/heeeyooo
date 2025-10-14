"use client";

import WordLine from "../WordLine/WordLine";
import { useEffect, useState } from "react";
import styles from "./Services.module.scss";

const Services = () => {
	const [device, setDevice] = useState("mobile");

	useEffect(() => {
		const dividers = document.querySelectorAll(
			`.${styles["service__divider"]}`
		);

		dividers.forEach((divider) => {
			window.addEventListener("scroll", () => {
				if (!dividers) return;
				const dividerRect = divider.getBoundingClientRect();

				if (dividerRect.top < window.innerHeight) {
					divider.classList.add(styles["service__divider--active"]);
				} else {
					divider.classList.remove(styles["service__divider--active"]);
				}
			});
		});
	}, []);

	return (
		<div className={styles.services}>
			<h2 className={styles["services__title"]}>
				<WordLine text="Services" />
			</h2>
			<div className={styles["services__desc"]}>
				<WordLine text="We specialize in crafting websites from idea, through design to development and post-deployment follow-up support." />
			</div>
			<div className={styles["home__services-grid"]}>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="UX/UI Design" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="Looking for a website that not only looks amazing but drives results? Our professional web design services combine creativity, usability, and cutting-edge technology to create websites that attract visitors and convert them into customers. We specialize in responsive web design, e-commerce websites, landing pages, and custom solutions tailored to your brand." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="Web Development" />
					</div>

					<div className={styles["service__desc"]}>
						<WordLine text="Need a website or web application that works flawlessly and scales with your business? Our expert web development services deliver high-quality, custom solutions tailored to your needs. We specialize in front-end and back-end development, e-commerce platforms, custom web applications, and API integrations, ensuring your site is fast, secure, and reliable." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="Hosting" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="Ensure your website is always fast, secure, and accessible with our professional web hosting services. We provide high-performance hosting, secure servers, and 99.9% uptime, giving your website the stability it needs to grow your business online." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="Website Optimization" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="A fast website means better user experience, higher rankings, and more conversions. We specialize in making websites load instantly and run smoothly — across all devices." />
						<div style={{ marginTop: 10 }}>
							<p>Performance based on current website</p>
							<div
								className={styles["portfolio__btn-container"]}
								data-cursor-inactive
							>
								<button
									className={
										device === "mobile"
											? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
											: styles["portfolio__btn"]
									}
									onClick={() => setDevice("mobile")}
								>
									<span>Mobile</span>
								</button>
								<button
									className={
										device === "desktop"
											? `${styles["portfolio__btn"]} ${styles["portfolio__btn--active"]}`
											: styles["portfolio__btn"]
									}
									onClick={() => setDevice("desktop")}
								>
									<span>Desktop</span>
								</button>
							</div>
							{device === "mobile" && (
								<div className={styles["circles-container"]}>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "77%" } as React.CSSProperties}
											data-value={77}
										></div>
										<span>Performance</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "90%" } as React.CSSProperties}
											data-value={90}
										></div>
										<span>Accessibility</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "100%" } as React.CSSProperties}
											data-value={100}
										></div>
										<span>Best Practices</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "92%" } as React.CSSProperties}
											data-value={92}
										></div>
										<span>SEO</span>
									</div>
								</div>
							)}
							{device === "desktop" && (
								<div className={styles["circles-container"]}>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "81%" } as React.CSSProperties}
											data-value={81}
										></div>
										<span>Performance</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "90%" } as React.CSSProperties}
											data-value={90}
										></div>
										<span>Accessibility</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "100%" } as React.CSSProperties}
											data-value={100}
										></div>
										<span>Best Practices</span>
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<div
											className={styles["circle"]}
											style={{ "--value": "92%" } as React.CSSProperties}
											data-value={92}
										></div>
										<span>SEO</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="Website Maintenance" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="Keep your website running smoothly, securely, and up-to-date with our professional website maintenance services. We handle regular updates, security monitoring, backups, performance optimization, and content management, so your site stays fast, safe, and fully functional." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="SEO" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="Want your website to rank higher on Google and attract more qualified traffic? Our professional SEO services help businesses improve their online presence, drive organic traffic, and increase conversions. We specialize in on-page SEO, off-page SEO, technical SEO, keyword research, and content optimization, ensuring your website performs at its best in search engines." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
				<div className={styles["service"]}>
					<div className={styles["service__title"]}>
						<WordLine text="Website Redesign" />
					</div>
					<div className={styles["service__desc"]}>
						<WordLine text="Your website is often the first impression customers have of your business. If it feels outdated, slow, or hard to use, you may be losing valuable opportunities. Our Website Redesign & Development service transforms your existing website into a modern, high-performing digital platform that aligns with your brand and goals." />
					</div>
				</div>
				<div className={styles["service__divider"]}></div>
			</div>
		</div>
	);
};

export default Services;
