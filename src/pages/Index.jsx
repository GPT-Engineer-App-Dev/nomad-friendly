import { Box, Container, Flex, Input, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching city data:", error));
  }, []);

  const filteredCities = searchTerm
    ? cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : cities;

  return (
    <Box>
      <Flex as="nav" bg="teal.500" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="white">NomadRank</Text>
      </Flex>
      <Box bgImage="url('/images/tropical-beach.jpg')" bgSize="cover" bgPos="center" h="40vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold" color="white">Find the Best Cities for Digital Nomads</Text>
      </Box>
      <Container maxW="container.xl" p={4}>
        <Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {filteredCities.map(city => (
            <Box key={city.id} p={4} shadow="md" borderWidth="1px">
              <Text fontSize="xl">{city.name}</Text>
              <Text>{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Index;