// TODO: word "type" specifies that i only import type not an object
import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { Chakra_Petch } from "next/font/google";
import { Project } from "./interfaces/Project";
import "./globals.scss";

const chakraPetch = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal"],
	variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
	title: "Creative web design & development agency • heeeyooo studio",
	description:
		"Modern web development, SEO, and optimization to make your brand stand out online • heeeyooo studio.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// TODO:
	const url = process.env.API_URL!;
	const headers = {
		"X-SILO-KEY": process.env.API_KEY!,
		"Content-Type": "application/json",
	};

	// TODO:
	const response = await fetch(url, { headers: headers });
	const workData: Project[] = await response.json();

	return (
		<html lang="en" className={chakraPetch.className}>
			<body>
				<Header workDataLength={workData.length} />
				{children}
				<CustomCursor />
				<Footer />
			</body>
		</html>
	);
}
