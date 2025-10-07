import styles from "./PageNav.module.scss";
import Link from "next/link";

interface PageNavProps {
	pageName: string;
	projectName?: string;
}

const PageNav = ({ pageName, projectName }: PageNavProps) => {
	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<Link className={styles["page-nav__link"]} href="/">
					Home
				</Link>{" "}
				&bull;{" "}
				{projectName ? (
					<Link className={styles["page-nav__link"]} href="/work">
						{pageName}
					</Link>
				) : (
					<span style={{ color: "hsl(0, 0%, 50%)" }}>{pageName}</span>
				)}
				{projectName && (
					<>
						{" "}
						&bull;{" "}
						<span style={{ color: "hsl(0, 0%, 50%)" }}>{projectName}</span>
					</>
				)}
			</div>
		</>
	);
};

export default PageNav;
