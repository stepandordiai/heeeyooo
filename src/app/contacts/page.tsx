"use client";
import Head from "next/head";
// import { useEffect } from "react";
import Link from "next/link";
import styles from "./Contacts.module.scss";
import Container from "../components/Container/Container";

const Contacts = () => {
	// async function initMap() {
	// 	const centerPosition = { lat: 50.02718425360769, lng: 15.202752716064479 }; // Center of Czech Republic

	// 	// Example dark theme style (Snazzy Maps)
	// 	const darkStyle = [
	// 		{ elementType: "geometry", stylers: [{ color: "#323232" }] },
	// 		{ elementType: "labels.text.fill", stylers: [{ color: "#7e7e7e" }] },
	// 		{ elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
	// 		{
	// 			featureType: "road",
	// 			elementType: "geometry",
	// 			stylers: [{ color: "#000000" }],
	// 		},
	// 		{
	// 			featureType: "water",
	// 			elementType: "geometry",
	// 			stylers: [{ color: "#0e1626" }],
	// 		},
	// 		{
	// 			featureType: "water",
	// 			elementType: "labels.text.fill",
	// 			stylers: [{ color: "#4e6d70" }],
	// 		},

	// 		// Hides POI icons
	// 		{
	// 			featureType: "poi",
	// 			elementType: "labels.icon",
	// 			stylers: [{ visibility: "off" }],
	// 		},
	// 		// Optional: hide POI text labels too
	// 		{
	// 			featureType: "poi",
	// 			elementType: "labels.text",
	// 			stylers: [{ visibility: "off" }],
	// 		},
	// 		{
	// 			featureType: "poi.airport",
	// 			elementType: "labels.icon",
	// 			stylers: [{ visibility: "off" }],
	// 		},
	// 		// {
	// 		// 	featureType: "poi.airport",
	// 		// 	elementType: "labels.text",
	// 		// 	stylers: [{ visibility: "off" }],
	// 		// },
	// 	];

	// 	// new google.maps.Map(document.getElementById("map"), {
	// 	// 	zoom: 14,
	// 	// 	center: centerPosition,
	// 	// 	disableDefaultUI: true,
	// 	// 	mapTypeId: google.maps.MapTypeId.ROADMAP,
	// 	// 	styles: darkStyle,
	// 	// });
	// }

	// useEffect(() => {
	// 	initMap();
	// }, []);

	return (
		<>
			<Head>
				<title>Contacts &bull; heeeyooo studio</title>
				<link rel="canonical" href="https://www.heeeyooo.studio/contacts" />
			</Head>
			<main className={styles.contacts}>
				<Container>
					<div style={{ marginBottom: 20 }}>
						<Link className={styles["page-nav__link"]} href="/">
							Home
						</Link>{" "}
						&bull; <span style={{ color: "hsl(0, 0%, 50%)" }}>Contacts</span>
					</div>
					<div className={styles["contacts__inner"]}>
						<div className={styles["contacts__container"]}>
							<a
								className={styles["contacts__email"]}
								href="mailto:stepandordiai@gmail.com"
							>
								<p className={styles["contacts__details-title"]}>Say hello</p>
								<i className="fa-solid fa-envelope"></i>
							</a>
							<div className={styles["contacts__socials"]}>
								<a
									href="https://www.instagram.com/heeeyooo.studio/"
									target="_blank"
									className={styles["contacts__details"]}
								>
									<p className={styles["contacts__details-title"]}>
										Follow us on Instagram
									</p>
									<i className="fa-brands fa-instagram"></i>
								</a>
								<a href="" className={styles["contacts__details"]}>
									<p className={styles["contacts__details-title"]}>
										Follow us on Facebook
									</p>
									<i className="fa-brands fa-facebook-f"></i>
								</a>
							</div>
						</div>
						<div className={styles["contacts__map-form-container"]}>
							<div className={styles["contacts__details-map"]}>
								<p className={styles["contacts__details-title"]}>
									Kolin, Prague
								</p>
								{/* <i className="fa-solid fa-map"></i> */}
								{/* <div id="map"></div> */}
							</div>
							<div className={styles["contacts__form-details"]}>
								<p className={styles["contacts__form-details-title"]}>
									Tell us more about yourself and what you&apos;ve got in mind.
								</p>
								<form
									className={styles["contacts__form"]}
									action="https://formspree.io/f/xovddpld"
									method="post"
								>
									<div className={styles["contacts__form-container"]}>
										<label htmlFor="fullName">Full name</label>
										<input
											className={styles["input"]}
											type="text"
											name="fullName"
											id="fullName"
										/>
									</div>
									<div className={styles["contacts__form-container"]}>
										<label htmlFor="email">E-mail</label>
										<input
											className="input"
											type="text"
											name="email"
											id="email"
										/>
									</div>
									<div className="contacts__form-container">
										<label htmlFor="message">
											Tell us a little about the project...
										</label>
										<textarea name="message" id="message"></textarea>
									</div>
									<div>
										<p style={{ marginBottom: 5 }}>How can we help?</p>
										<div className={styles["check-container"]}>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<input
													type="checkbox"
													name="howCanWeHelp"
													id="strategy"
													value="UX/UI Design"
												/>
												<label htmlFor="strategy">UX/UI Design</label>
											</div>
											<div>
												<input
													type="checkbox"
													name="howCanWeHelp"
													id="design"
													value="Web Development"
												/>
												<label htmlFor="design">Web Development</label>
											</div>
											<div>
												<input
													type="checkbox"
													name="howCanWeHelp"
													id="development"
													value="Hosting"
												/>
												<label htmlFor="development">Hosting</label>
											</div>
											<div>
												<input
													type="checkbox"
													name="howCanWeHelp"
													id="hosting"
													value="Website Maintenance"
												/>
												<label htmlFor="hosting">Website Maintenance</label>
											</div>
											<div>
												<input
													type="checkbox"
													name="howCanWeHelp"
													id="seo"
													value="SEO"
												/>
												<label htmlFor="seo">SEO</label>
											</div>
										</div>
									</div>
									<button
										className={styles["contacts__form-btn"]}
										type="submit"
									>
										Let&apos;s get started!
									</button>
								</form>
								<div style={{ marginTop: 10 }}>
									<p>Don&apos;t like forms? Write us a message instead!</p>
									<a
										href="mailto:stepandordiai@gmail.com"
										style={{ color: "black" }}
									>
										stepandordiai@gmail.com
									</a>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</main>
		</>
	);
};

export default Contacts;
