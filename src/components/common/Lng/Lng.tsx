"use client";

// TODO: LEARN THIS
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import classNames from "classnames";
import UnitedStatesFlag from "@/components/icons/UnitedStatesFlag";
import CzechiaFlag from "@/components/icons/CzechiaFlag";
import UkraineFlag from "@/components/icons/UkraineFlag";
import styles from "./Lng.module.scss";

const lngData = [
	{ code: "en", name: "English", flag: <UnitedStatesFlag size={20} /> },
	{ code: "uk", name: "Українська", flag: <UkraineFlag size={20} /> },
	{ code: "cs", name: "Čeština", flag: <CzechiaFlag size={20} /> },
];

type LngProps = {
	lngModalVisible: boolean;
	// TODO: learn this
	setLngModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Lng = ({ lngModalVisible, setLngModalVisible }: LngProps) => {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!lngModalVisible) return;

		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [lngModalVisible]);

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
	};

	if (!mounted || !lngModalVisible) return null;

	return createPortal(
		<div
			className={classNames(styles.modal, {
				[styles["modal--visible"]]: lngModalVisible,
			})}
		>
			<div className={styles.container}>
				<p className={styles["modal__title"]}>{t("lng.title")}</p>
				<div className={styles.inner}>
					{lngData.map((lng) => (
						<button
							key={lng.code}
							onClick={() => handleLanguageChange(lng.code)}
							className={classNames(styles["lng-btn"], {
								[styles["lng-btn--active"]]: locale === lng.code,
							})}
						>
							{lng.flag}
							<span>{lng.name}</span>
						</button>
					))}
				</div>
				<button
					className="primary-btn"
					onClick={() => setLngModalVisible(false)}
				>
					{t("lng.close")}
				</button>
			</div>
		</div>,
		document.body,
	);
};

export default Lng;
