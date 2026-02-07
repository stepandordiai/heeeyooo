"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import linksData from "@/app/data/links-data.json";
import { Link } from "@/i18n/navigation";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Header.module.scss";

type HeaderProps = {
	workLength: number;
};

const Header = ({ workLength }: HeaderProps) => {
	const t = useTranslations();
	const pathname = usePathname();

	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [headerHidden, setHeaderHidden] = useState(false);

	useEffect(() => {
		let prevScrollY = 0;

		function handleHeaderOnScroll() {
			const scrollY = window.scrollY;

			setHeaderHidden(scrollY > prevScrollY);

			prevScrollY = scrollY;

			setIsMenuVisible(false);
		}

		window.addEventListener("scroll", handleHeaderOnScroll);

		return () => window.removeEventListener("scroll", handleHeaderOnScroll);
	}, []);

	useEffect(() => {
		setIsMenuVisible(false);
	}, [pathname]);

	// Close menu on Esc
	useEffect(() => {
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuVisible(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

	const toggleMenu = () => setIsMenuVisible((prev) => !prev);

	return (
		<header
			className={classNames(styles.header, {
				[styles["header--active"]]: isMenuVisible,
				[styles["header--hide"]]: headerHidden,
			})}
		>
			<div className={styles["header__inner"]}>
				<Link className={styles["header__logo-link"]} href="/">
					<Image
						width={35}
						height={35}
						className={styles["header__logo-img"]}
						src="/heeeyooo-studio-logo-white-v1.svg"
						alt="heeeyooo studio logo"
					/>
				</Link>
				<nav className={styles["header__nav"]}>
					{linksData.map((link) => {
						return (
							<Link
								key={link.id}
								className={classNames(styles["header__nav-link"], {
									[styles["header__nav-link--active"]]: pathname === link.path,
								})}
								href={link.path}
							>
								<span>{t(link.name)}</span>
								{link.workQty && (
									<span className={styles["header__work-qty"]}>
										{workLength}
									</span>
								)}
							</Link>
						);
					})}
				</nav>
				{/* menu-btn */}
				<button
					onClick={toggleMenu}
					className={styles["burger-btn"]}
					aria-label={
						isMenuVisible ? t("header.closeMenu") : t("header.openMenu")
					}
					aria-expanded={isMenuVisible}
					aria-controls="menu"
					title={isMenuVisible ? t("header.closeMenu") : t("header.openMenu")}
				>
					<span
						className={classNames(styles["burger-btn-inner"], {
							[styles["burger-btn-inner--active"]]: isMenuVisible,
						})}
					></span>
				</button>
			</div>
			<nav
				className={classNames(styles["menu"], {
					[styles["menu--active"]]: isMenuVisible,
				})}
				id="menu"
				hidden={!isMenuVisible}
			>
				<div className={styles["menu__nav"]}>
					{linksData.map((link) => {
						return (
							<div key={link.id} className={styles["menu__nav-item"]}>
								<Link
									onClick={() => setIsMenuVisible(false)}
									className={classNames(styles["menu__nav-link"], {
										[styles["menu__nav-link--active"]]: pathname === link.path,
										[styles["menu__nav-link--show"]]: isMenuVisible,
									})}
									href={link.path}
								>
									<span>{t(link.name)}</span>
									{link.workQty && (
										<span className={styles["work-qty"]}>{workLength}</span>
									)}
								</Link>
							</div>
						);
					})}
				</div>
			</nav>
		</header>
	);
};

export default Header;
