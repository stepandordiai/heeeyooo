import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import React from "react";
import styles from "./Breadcrumbs.module.scss";

interface Breadcrumb {
	label: string;
	path?: string;
}

type BreadcrumbsProps = {
	links: Breadcrumb[];
};

const Breadcrumbs = async ({ links }: BreadcrumbsProps) => {
	const t = await getTranslations();

	return (
		<nav className="breadcrumbs" style={{ marginBottom: 20 }}>
			<Link className={styles["breadcrumbs__link"]} href="/">
				{t("homeTitle")}
			</Link>
			<span> &bull; </span>
			{links.map((link, i) => {
				const isLastLink = i === links.length - 1;
				return link.path && !isLastLink ? (
					<React.Fragment key={i}>
						<Link className={styles["breadcrumbs__link"]} href={link.path}>
							{link.label}
						</Link>
						<span> &bull; </span>
					</React.Fragment>
				) : (
					<span key={i} style={{ color: "hsl(0, 0%, 50%)" }}>
						{link.label}
					</span>
				);
			})}
		</nav>
	);
};

export default Breadcrumbs;
