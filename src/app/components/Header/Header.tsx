"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import linksData from "./../../data/links-data.json";
import Link from "next/link";
import logoImg from "./../../../../public/heeeyooo-studio-logo-white-v1.svg";
import styles from "./Header.module.scss";
import classNames from "classnames";

type HeaderProps = {
	workDataLength: number;
};

const Header = ({ workDataLength }: HeaderProps) => {
	const pathname = usePathname();

	const [isMenuActive, setIsMenuActive] = useState(false);
	const [headerHide, setHeaderHide] = useState(false);

	useEffect(() => {
		let prevScrollY = 0;

		function handleHeaderOnScroll() {
			const scrollY = window.scrollY;

			setHeaderHide(scrollY > prevScrollY);

			prevScrollY = scrollY;

			setIsMenuActive(false);
		}

		window.addEventListener("scroll", handleHeaderOnScroll);

		return () => window.removeEventListener("scroll", handleHeaderOnScroll);
	}, []);

	useEffect(() => {
		setIsMenuActive(false);
	}, [pathname]);

	// Close menu on Esc
	useEffect(() => {
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.code === "Escape") {
				setIsMenuActive(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

	function toggleBurgerBtn() {
		setIsMenuActive((prev) => !prev);
	}

	return (
		<header
			className={classNames(styles.header, {
				[styles["header--active"]]: isMenuActive,
				[styles["header--hide"]]: headerHide,
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
								<span>{link.name}</span>
								{link.workQty && (
									<span className={styles["header__work-qty"]}>
										{workDataLength}
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
					aria-label={isMenuActive ? "Close menu" : "Open menu"}
				>
					<span
						className={classNames(styles["burger-btn"], {
							[styles["burger-btn--active"]]: isMenuActive,
						})}
					></span>
				</button>
			</div>
			<div
				className={classNames(styles["menu"], {
					[styles["menu--active"]]: isMenuActive,
				})}
			>
				<nav className={styles["menu__nav"]}>
					{linksData.map((link) => {
						return (
							<div key={link.id} className={styles["menu__nav-item"]}>
								<Link
									onClick={() => setIsMenuActive(false)}
									className={classNames(styles["menu__nav-link"], {
										[styles["menu__nav-link--active"]]: pathname === link.path,
										[styles["menu__nav-link--show"]]: isMenuActive,
									})}
									href={link.path}
								>
									<span>{link.name}</span>
									{link.workQty && (
										<span className={styles["work-qty"]}>{workDataLength}</span>
									)}
								</Link>
							</div>
						);
					})}
				</nav>
			</div>
		</header>
	);
};

export default Header;
