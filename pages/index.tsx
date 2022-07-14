import { Box, Flex, Image, Text } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="purple"
      isRoundedImage
      subtitle="Profile"
      title={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
      description={`${user?.playlistsCount ?? 0} public playlist`}
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="smaller" fontWeight="light" color="gray.400">
            only visible to you
          </Text>
        </Box>

        <Box width="100%" overflowX="auto">
          <Flex gap="20px" width="max-content">
            {artists.map((artist) => (
              <Box
                key={artist.id}
                bg="gray.900"
                borderRadius="8px"
                padding="16px"
                width="240px"
              >
                <Image
                  src="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fi.picsum.photos%2Fid%2F387%2F400%2F400.jpg%3Fhmac%3DuHaIoMDR9JwCoiI3IUuS_7v8HCVg21wFGk-VY_j06nU?table=block&id=22d6e9b9-69be-49eb-a885-d70170cb2dd2&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=800&userId=&cache=v2"
                  width="100%"
                  borderRadius="100%"
                />
                <Box marginTop="16px">
                  <Text fontSize="large" fontWeight="bold">
                    {artist.name}
                  </Text>
                  <Text fontSize="smaller" fontWeight="light" color="gray.400">
                    Artist
                  </Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
