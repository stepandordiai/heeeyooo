import styles from "./PageNav.module.scss";
import Link from "next/link";

interface PageNavProps {
	projectName?: string;
}

const PageNav = ({ projectName }: PageNavProps) => {
	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<Link className={styles["page-nav__link"]} href="/">
					Home
				</Link>{" "}
				&bull;{" "}
				<Link className={styles["page-nav__link"]} href="/work">
					Work
				</Link>
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
