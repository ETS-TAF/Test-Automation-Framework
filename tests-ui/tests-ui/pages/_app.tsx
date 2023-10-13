import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Button,
  ChakraProvider,
  Divider,
  HStack,
  Link,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <>
        <HStack p={4} backgroundColor="blue.100">
          <Button colorScheme="blue" leftIcon={<FaHome />}>
            <Link href="/">Accueil</Link>
          </Button>
          <Image
            src="/etslogo.png"
            alt="Logo ÉTS"
            width={100}
            height={50}
            style={{ marginLeft: "auto" }}
          />
        </HStack>
        <Divider />
        <Component {...pageProps} />
      </>
    </ChakraProvider>
  );
}
