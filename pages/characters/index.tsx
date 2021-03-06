import { Box, Flex, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import AppHeader from "../../components/AppHeader"
import ListCharacters from "../../components/ListCharacters"
import api from "../../service/api"
import { Character } from "../../types/Character"

interface Props {
  elementsData: {
    type: string
    icon: string
  }[]

  charactersData: Character[]
}

const CharactersPage: NextPage<Props> = ({
  elementsData,
  charactersData,
}: Props) => {
  if (!elementsData || !charactersData) {
    return <Box> Loading... </Box>
  }

  function filterCharactersByElement(element: string) {
    return charactersData.filter((char) => char.element === element)
  }

  return (
    <Box>
      <AppHeader />

      <Flex
        direction={"column"}
        align={"center"}
        p={"15px 10px 5px 10px"}
        as={"main"}
      >
        <Text mb={"7px"}> Characters </Text>

        <ListCharacters
          elements={elementsData}
          filterCharactersByElement={filterCharactersByElement}
        />
      </Flex>
    </Box>
  )
}

CharactersPage.getInitialProps = async () => {
  async function getElementData() {
    const response = await api.get("/elements")

    return response.data
  }

  async function getCharactersData() {
    const response = await api.get("/characters")

    return response.data
  }

  return {
    elementsData: await getElementData(),
    charactersData: await getCharactersData(),
  }
}

export default CharactersPage
