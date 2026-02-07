"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname, getPathname } from "@/i18n/navigation";
import linksData from "@/app/data/links-data.json";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import logoImg from "./../../../../../public/heeeyooo-studio-logo-white-v1.svg";
import styles from "./Header.module.scss";
import classNames from "classnames";

type HeaderProps = {
	workLength: number;
};

const Header = ({ workLength }: HeaderProps) => {
	const t = useTranslations();
	const pathname = usePathname();
	const locale = useLocale();

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
			if (e.code === "Escape") {
				setIsMenuVisible(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

	function toggleBurgerBtn() {
		setIsMenuVisible((prev) => !prev);
	}

	return (
		<header
			className={classNames(styles.header, {
				[styles["header--active"]]: isMenuVisible,
				[styles["header--hide"]]: headerHidden,
			})}
		>
			<div className={styles["header__inner"]}>
				<Link className={styles["header__logo-link"]} href="/">
					<img
						width={35}
						height={35}
						className={styles["header__logo-img"]}
						// TODO:
						src={logoImg.src}
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
					onClick={toggleBurgerBtn}
					className={styles["burger-btn__container"]}
					aria-label={isMenuVisible ? "Close menu" : "Open menu"}
					aria-expanded={isMenuVisible}
					aria-controls="menu"
				>
					<span
						className={classNames(styles["burger-btn"], {
							[styles["burger-btn--active"]]: isMenuVisible,
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
										[styles["menu__nav-link--active"]]:
											// TODO: LEARN THIS
											pathname === getPathname({ href: link.path, locale }),
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
