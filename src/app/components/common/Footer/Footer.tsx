"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import linksData from "@/app/data/links-data.json";
import Container from "../../Container/Container";
import { Link } from "@/i18n/navigation";
import Lng from "../../Lng/Lng";
import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
	const t = useTranslations();
	const pathname = usePathname();

	return (
		<footer className={styles.footer}>
			<Lng />
			<Container>
				<p style={{ fontSize: "3rem" }}>heeeyooo studio</p>
				<div className={styles["footer-top"]}>
					<div className={styles["footer__nav"]}>
						<h3 style={{ marginBottom: 5 }}>{t("footer.sitemap")}</h3>
						{linksData.map((link) => {
							return (
								<Link
									key={link.id}
									className={classNames(styles["footer__nav-link"], {
										[styles["footer__nav-link--active"]]:
											link.path === pathname,
									})}
									href={link.path}
								>
									{t(link.name)}
								</Link>
							);
						})}
					</div>
				</div>
				<div className={styles["footer-bottom"]}>
					<p>&copy; {new Date().getFullYear()} heeeyooo studio</p>
					<p>{t("footer.allRightsReserved")}</p>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
