import { Box, Flex, Text, Image } from "@chakra-ui/react";

const GradientLayout = ({
  image,
  isRoundedImage,
  color,
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="250px"
            boxShadow="2xl"
            src={image}
            borderRadius={isRoundedImage ? "100%" : "5px"}
          />
        </Box>

        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="smaller" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>

          <Text fontSize="8xl" fontWeight="extrabold" lineHeight="90px">
            {title}
          </Text>

          <Text fontSize="smaller" fontWeight="semibold">
            {description}
          </Text>
        </Box>
      </Flex>

      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
