import type { Metadata } from "next";
import Container from "../components/Container/Container";
import PageNav from "../components/PageNav/PageNav";
import styles from "./Contacts.module.scss";

export const metadata: Metadata = {
	title: "Contacts • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/contacts",
	},
};

const Contacts = () => {
	return (
		<main className={styles.contacts}>
			<Container>
				<PageNav pageName="Contacts" />
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
						</div>
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
							<label htmlFor="fullName">Full name</label>
							<input
								className={styles["input"]}
								type="text"
								name="fullName"
								id="fullName"
							/>
							<label htmlFor="email">E-mail</label>
							<input
								className={styles["input"]}
								type="email"
								name="email"
								id="email"
							/>
							<label htmlFor="message">
								Tell us a little about the project...
							</label>
							<textarea
								className={styles["textarea"]}
								name="message"
								id="message"
							></textarea>
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
											id="website-optimization"
											value="Website Optimization"
										/>
										<label htmlFor="website-optimization">
											Website Optimization
										</label>
									</div>
									<div>
										<input
											type="checkbox"
											name="howCanWeHelp"
											id="website-maintenance"
											value="Website Maintenance"
										/>
										<label htmlFor="website-maintenance">
											Website Maintenance
										</label>
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
									<div>
										<input
											type="checkbox"
											name="howCanWeHelp"
											id="website-redesign"
											value="Website Redesign"
										/>
										<label htmlFor="website-redesign">Website Redesign</label>
									</div>
								</div>
							</div>
							<button className={styles["contacts__form-btn"]} type="submit">
								Let&apos;s get started!
							</button>
						</form>
						<div style={{ marginTop: 10 }}>
							<p>Don&apos;t like forms? Write us a message instead!</p>
							<a
								href="mailto:stepandordiai@gmail.com"
								style={{ color: "#000" }}
							>
								stepandordiai@gmail.com
							</a>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
};

export default Contacts;
