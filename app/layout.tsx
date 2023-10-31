"use client";

import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { metadata } from "../components/metadata";

import { MetaMaskProvider } from "@metamask/sdk-react";

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
				<meta name="description" content={metadata.description} />
			</head>
			<body>
				<MetaMaskProvider
					debug={false}
					sdkOptions={{
						checkInstallationImmediately: false,
						dappMetadata: {
							name: "Fuck Elon DApp",
							url: window.location.host,
						},
					}}
				>
					<MantineProvider theme={theme}>{children}</MantineProvider>
				</MetaMaskProvider>
			</body>
		</html>
	);
}
