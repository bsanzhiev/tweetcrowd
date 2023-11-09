"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import elonJpg from "../public/elon.jpg";

import { Contract, Web3 } from "web3";
import { useSDK } from "@metamask/sdk-react";
import CrowdfundingContract from "../compiled/crowdfunding-abi.json";

const CROWDFUNDING_CONTRACT_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const web3: Web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);

export default function HomePage() {
  // const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState<string>();

  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [contract, setContract] = useState();

  useEffect(() => {
    const contract: any = new web3.eth.Contract(
      CrowdfundingContract,
      CROWDFUNDING_CONTRACT_ADDRESS
    );
    contract.handleRevert = true;
    setContract(contract);
    console.log("contract", contract);
  }, []);

  const form = useForm({
    initialValues: {
      donateAmount: "10000000000000000",
    },
  });

  const connect = async () => {
    try {
      const connectedAccounts = await sdk?.connect();
      if (connectedAccounts) {
        if (Array.isArray(connectedAccounts) && connectedAccounts[0]) {
          setAccount(connectedAccounts[0]);
        } else {
          console.warn("No connected accounts.");
        }
      }
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

    // const contract: Contract = 
    const response = await contract.methods.donate().send({
      from: account,
      value: donationAmount,
    });
    console.log("contract", response);
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
