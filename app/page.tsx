"use client";

import { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import CrowdfundingContract from "../instances/Crowdfunding.json";
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
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import elonJpg from "../public/elon.jpg";

import { useSDK } from "@metamask/sdk-react";

const CROWDFUNDING_CONTRACT_ADDRESS =
	"0x9A676e781A523b5d0C0e43731313A708CB607508";

export default function HomePage() {
	// const [isWalletConnected, setIsWalletConnected] = useState(false);
	const { sdk, connected, connecting, provider, chainId } = useSDK();
	const [account, setAccount] = useState<string>();
	const [crowdfundingContractInstance, setCrowdfundingContractInstance] =
		useState();

	const web3 = new Web3("http://localhost:8545");

	useEffect(() => {
		const web3ForContract = new Web3(window.ethereum);
		// Contract.getProvider(web3ForContract);
		const crowdfundingContractInstance = new Contract(
			CrowdfundingContract,
			CROWDFUNDING_CONTRACT_ADDRESS
		);
		setCrowdfundingContractInstance(crowdfundingContractInstance);
	});

	const form = useForm({
		initialValues: {
			donateAmount: "10000000000000000",
		},
	});

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
	};
	console.log("account", account);

	const donateETH = async () => {
		if (!account || !window.ethereum) {
			console.log("Wallet is not connected");
			return;
		}
		const donationAmount = form.getInputProps("donateAmount").value;

		console.log("donateAmount", donationAmount);

		const response = await crowdfundingContractInstance.method.donate().send({
			from: account,
			value: donationAmount,
		});
	};

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
					<Container style={{ display: "flex", flexDirection: "column" }}>
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
									{...form.getInputProps("donateAmount")}
								/>
								<Button onClick={donateETH}>Donate</Button>
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
