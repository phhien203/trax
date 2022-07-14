import { Box, Button, Flex, Input } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await auth(mode, { email, password, firstName, lastName });
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>

      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              value={firstName}
              type="text"
              autoComplete="off"
              marginBottom="8px"
              placeholder="Input Your First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              value={lastName}
              type="text"
              autoComplete="off"
              marginBottom="8px"
              placeholder="Input Your Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <Input
              type="email"
              autoComplete="off"
              marginBottom="8px"
              placeholder="Input Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              autoComplete="off"
              marginBottom="8px"
              placeholder="Input Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
