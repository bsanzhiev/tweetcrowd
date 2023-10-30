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

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(true);

  const connectedAccount = "0x1501010100110010101x0000010101";

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

        {isWalletConnected ? (
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
                  {connectedAccount}
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
              <Button mt={24} color="red" onClick={() => console.log("click3")}>
                Reset Connection
              </Button>
            </Box>
          </Container>
        ) : (
          <Container>
            <Button>Connect Wallet</Button>
          </Container>
        )}
        <Container mt={16}>
          <Text>Response Message</Text>
        </Container>
      </Container>
    </>
  );
}
