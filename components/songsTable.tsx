import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useStoreActions } from "easy-peasy";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            size="lg"
            isRound
            aria-label="Play"
            colorScheme="green"
            icon={<BsFillPlayFill fontSize="30px" />}
            onClick={() => handlePlay()}
          />
        </Box>

        <Table variant="unstyled" color="white">
          <Thead borderBottom="1px solid" borderColor="rgb(255, 255, 255, 0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, idx) => (
              <Tr
                key={song.id}
                cursor="pointer"
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => handlePlay(song)}
              >
                <Td>{idx + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
