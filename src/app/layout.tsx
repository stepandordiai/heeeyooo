// TODO: word "type" specifies that i only import type not an object
import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { Chakra_Petch } from "next/font/google";
import "./globals.scss";

const chakraPetch = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal"],
	variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
	title: "Creative web design & development agency • heeeyooo studio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={chakraPetch.className}>
			<body>
				<Header />
				{children}
				<CustomCursor />
				<Footer />
			</body>
		</html>
	);
}
