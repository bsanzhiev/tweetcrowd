"use client";

import { useState } from "react";
import {
	Box,
	Button,
	Container,
	Image,
	Input,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import NextImage from "next/image";
import elonJpg from "../public/elon.jpg";

export default function HomePage() {
	const [isWalletConnected, setIsWalletConnected] = useState(true);

	return (
		<Container size={"md"} ta={"center"} my={24}>
			<header>
				<Image component={NextImage} src={elonJpg} alt="Asshole" />
				<Title>Fuck Elon!</Title>
			</header>

			{isWalletConnected ? (
				<>
					<Text>Connected Account:</Text>
					<Box>
						<TextInput label="WEI" />
						<Button onClick={() => console.log("click")}>Donate</Button>
					</Box>
					<Box>
						<Button onClick={() => console.log("click2")}>
							See Total Contribution Amount
						</Button>
					</Box>
				</>
			) : (
				<Container>
					<Button>Connect Wallet</Button>
				</Container>
			)}
			<Text>Response Message</Text>
		</Container>
	);
}
