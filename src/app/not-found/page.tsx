// app/not-found/page.tsx
import Link from "next/link";

export default function NotFound() {
	return (
		<div style={{ textAlign: "center", marginTop: "10rem" }}>
			<h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>404</h1>
			<p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
				Oops! Page not found.
			</p>
			<Link href="/">
				<button
					style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
				>
					Go Back Home
				</button>
			</Link>
		</div>
	);
}
