import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import servicesData from "./../../data/services-data.json";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import EnvelopeIcon from "@/app/icons/EnvelopeIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import styles from "./Contact.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const page = "contact";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: t("contactTitle"),
		description: t("contactMetaDesc"),
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
			},
		},
	};
}

export default async function Contact() {
	const t = await getTranslations();

	return (
		<main className={styles.contact}>
			<Container>
				<Breadcrumbs links={[{ label: t("contactTitle") }]} />
				<div className={styles["contact__inner"]}>
					<div className={styles["contact__container"]}>
						<a
							className={styles["contact__details"]}
							href="mailto:stepandordiai@gmail.com"
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignSelf: "flex-end",
								}}
							>
								<span className={styles["contact__details-title"]}>
									{t("contact.sayHello")}
								</span>
								<span>hello@heeeyooo.studio</span>
							</div>
							<EnvelopeIcon size={24} />
						</a>
						<a
							href="https://www.instagram.com/heeeyooo.studio/"
							target="_blank"
							className={styles["contact__details"]}
						>
							<span
								style={{ alignSelf: "flex-end" }}
								className={styles["contact__details-title"]}
							>
								{t("contact.followUsOnInst")}
							</span>
							<InstagramIcon size={24} />
						</a>
					</div>
					<div className={styles["contact__form-details"]}>
						<p className={styles["contact__form-details-title"]}>
							{t("contact.formTitle")}
						</p>
						<form
							className={styles["contact__form"]}
							action="https://formspree.io/f/xovddpld"
							method="post"
						>
							<div>
								<label htmlFor="fullName">{t("contact.fullName")}</label>
								<input
									className={styles["input"]}
									type="text"
									name="fullName"
									id="fullName"
									autoComplete="name"
									required
								/>
							</div>
							<div>
								<label htmlFor="email">E-mail</label>
								<input
									className={styles["input"]}
									type="email"
									name="email"
									id="email"
									autoComplete="email"
									required
								/>
							</div>
							<div>
								<p style={{ marginBottom: 5 }}>{t("contact.howCanWeHelp")}</p>
								<div className={styles["check-container"]}>
									{servicesData.map((service) => {
										return (
											<label
												key={service.id}
												className={styles["checkbox-label"]}
											>
												<input
													className={styles["checkbox"]}
													type="checkbox"
													name="howCanWeHelp"
													value={service.title}
												/>
												{t(service.title)}
											</label>
										);
									})}
								</div>
							</div>
							<div>
								<label htmlFor="message">{t("contact.message")}</label>
								<textarea
									className={styles["textarea"]}
									name="message"
									id="message"
									rows={3}
								></textarea>
							</div>

							<div style={{ alignSelf: "flex-end" }}>
								{/* <input
									className={styles["input-reset"]}
									type="reset"
									value="Reset"
								/> */}
								<button className={styles["contact__form-btn"]} type="submit">
									{t("contact.formSendBtn")}
								</button>
							</div>
						</form>
						<div style={{ marginTop: 10 }}>
							<p>{t("contact.doNotLikeForms")}</p>
							<a
								className={styles["form__link"]}
								href="mailto:stepandordiai@gmail.com"
							>
								stepandordiai@gmail.com
							</a>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}
