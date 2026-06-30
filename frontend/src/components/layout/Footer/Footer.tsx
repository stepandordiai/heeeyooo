"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import linksData from "@/data/links-data.json";
import Container from "@/components/Container/Container";
import { Link } from "@/i18n/navigation";
import classNames from "classnames";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import styles from "./Footer.module.scss";

const Footer = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<Container>
			<footer className={styles.footer}>
				<h2 style={{ fontSize: "3rem" }}>heeeyooo studio</h2>
				<div>
					<p style={{ marginBottom: 5 }}>{t("footer.sitemap")}</p>
					<nav className={styles["footer__nav"]}>
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
					</nav>
				</div>
				<div>
					<p>&copy; {new Date().getFullYear()} heeeyooo studio</p>
					<p>{t("footer.allRightsReserved")}</p>
				</div>
				<button
					onClick={handleScrollToTop}
					className={styles["footer__scroll-to-top-btn"]}
				>
					<ArrowUpIcon size={20} />
				</button>
			</footer>
		</Container>
	);
};

export default Footer;
