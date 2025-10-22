"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import linksData from "./../../data/links-data.json";
import Link from "next/link";
import logoImg from "./../../../../public/heeeyooo-studio-logo-white-v1.svg";
import styles from "./Header.module.scss";

type HeaderProps = {
	workDataLength: number;
};

const Header = ({ workDataLength }: HeaderProps) => {
	const pathname = usePathname();

	const [isMenuActive, setIsMenuActive] = useState(false);
	const [headerHide, setHeaderHide] = useState(false);

	useEffect(() => {
		let prevScrollTop = 0;
		function handleHeaderOnScroll() {
			const scrollTop = document.documentElement.scrollTop;

			if (scrollTop > prevScrollTop) {
				setHeaderHide(true);
			} else {
				setHeaderHide(false);
			}
			prevScrollTop = scrollTop;
		}
		window.addEventListener("scroll", handleHeaderOnScroll);

		return () => window.removeEventListener("scroll", handleHeaderOnScroll);
	}, []);

	useEffect(() => {
		setIsMenuActive(false);
	}, [pathname]);

	function toggleBurgerBtn() {
		setIsMenuActive((prev) => !prev);
	}

	// Close menu on Esc
	useEffect(() => {
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuActive(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

	return (
		<header
			className={`${styles.header} ${
				isMenuActive ? styles["header--active"] : ""
			} ${headerHide ? styles["header--hide"] : ""}`}
		>
			<div className={styles["header__inner"]}>
				<Link className={styles["header__logo-link"]} href="/">
					<img
						width={35}
						height={35}
						className={styles["header__logo-img"]}
						// TODO:
						src={logoImg.src}
						alt="heeeyooo studio Logo"
					/>
				</Link>
				<nav className={styles["header__nav"]}>
					{linksData.map((link) => {
						return (
							<Link
								key={link.id}
								className={`${styles["header__nav-link"]} ${
									pathname === link.path
										? styles["header__nav-link--active"]
										: ""
								}`}
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
				<div
					onClick={toggleBurgerBtn}
					className={styles["burger-btn__container"]}
				>
					<div
						className={
							isMenuActive
								? `${styles["burger-btn"]} ${styles["burger-btn--active"]}`
								: styles["burger-btn"]
						}
					></div>
				</div>
			</div>
			<div
				className={
					isMenuActive
						? `${styles["menu"]} ${styles["menu--active"]}`
						: styles["menu"]
				}
			>
				<nav className={styles["menu__nav"]}>
					{linksData.map((link) => {
						return (
							<div key={link.id} className={styles["menu__nav-item"]}>
								<Link
									onClick={() => setIsMenuActive(false)}
									className={`${styles["menu__nav-link"]} ${
										pathname === link.path
											? styles["menu__nav-link--active"]
											: ""
									} ${isMenuActive ? styles["menu__nav-link--show"] : ""}`}
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
