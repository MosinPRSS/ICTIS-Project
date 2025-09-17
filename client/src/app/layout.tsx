import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/layout/Sidebar";
import "../assets/fonts/fonts.css";
import RootProvider from "@/store/RootProvider";
import Wrapper from "@/layout/Wrapper";
import Content from "@/layout/Content";

export const metadata: Metadata = {
	title: "ARI-ai",
	description: "ARI-ai",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<RootProvider>
				<body
					className={`antialiased b min-h-[100vh] w-[100vw] overflow-x-hidden flex`}
				>
					<Wrapper>
						<Sidebar />
						<Content>{children}</Content>
					</Wrapper>
				</body>
			</RootProvider>
		</html>
	);
}
