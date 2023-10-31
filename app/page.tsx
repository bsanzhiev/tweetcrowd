"use client";

import { useState } from "react";
import {
	Badge,
	Box,
	Button,
	Card,
	Container,
	Group,
	Image,
	Input,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import NextImage from "next/image";
import elonJpg from "../public/elon.jpg";

// Import wallet sdk
import { useSDK } from "@metamask/sdk-react";

export default function HomePage() {
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [account, setAccount] = useState<string>();
	const { sdk, connected, connecting, provider, chainId } = useSDK();

	const connect = async () => {
		try {
			const accounts = await sdk?.connect();
			setAccount(accounts?.[0]);
		} catch (err) {
			console.warn(`failed to connect...`, err);
		}
	};

  const closeConnection = () => {
    sdk?.terminate();
  }
  console.log("account", account)

	return (
		<>
			<Container size={"sm"} ta={"center"}>
				<header>
					<Container p={0} mb={36}>
						<Image
							component={NextImage}
							height={300}
							src={elonJpg}
							alt="Asshole"
						/>
						<Title mt={12}>Fuck Elon!</Title>
					</Container>
				</header>

				{connected ? (
					<Container
						style={{ display: "flex", flexDirection: "column" }}
						size={"xs"}
					>
						<Card
							padding="lg"
							withBorder
							mb={36}
							style={{ justifyContent: "space-between" }}
						>
							<Group align="center" justify="space-between">
								<Text>Connected Account:</Text>
								<Badge variant="outline" color="blue" size="lg" radius="md">
									{account}
								</Badge>
							</Group>
						</Card>
						<Card padding="lg" withBorder mb={36}>
							<Group justify="space-between">
								<TextInput
									style={{ width: "fit-content", maxWidth: "100%" }}
									rightSection={<Text>WEI</Text>}
									defaultValue={10000000000000000}
								/>
								<Button onClick={() => console.log("click")}>Donate</Button>
							</Group>
						</Card>
						<Box>
							<Button onClick={() => console.log("click1")}>
								See Total Contribution Amount
							</Button>
						</Box>
						<Box>
							<Button mt={24} onClick={() => console.log("click2")}>
								Request Refund
							</Button>
						</Box>
						<Box>
							<Button mt={24} color="red" onClick={closeConnection}>
								Reset Connection
							</Button>
						</Box>
					</Container>
				) : (
					<Container>
						<Button onClick={connect}>Connect Wallet</Button>
					</Container>
				)}
				<Container mt={16}>
					<Text>Response Message</Text>
				</Container>
			</Container>
		</>
	);
}
