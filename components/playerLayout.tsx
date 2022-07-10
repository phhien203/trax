import { Box } from "@chakra-ui/layout";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <h2>Sidebar Section</h2>
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" left="0">
        <h2>Player Section</h2>
      </Box>
    </Box>
  );
};

export default PlayerLayout;
