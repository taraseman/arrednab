import {
  Box,
  Flex,
  Button,
  InputGroup,
  Heading,
  InputLeftElement,
  Text,
  useDisclosure,
  Input,
  Select,
} from "@chakra-ui/react";
import AddArticleModal from "./modals/AddArticleModal";
import { ReactComponent as SearchIcon } from "assets/img/icons/search-icon.svg";
import { useAppSelector } from "hooks/redux";
import { useMemo, useState } from "react";
import { categories } from "config/constants";
import { debounce } from "lodash";
import DashboardArticle from "./DashboardArticle";

const Dashboard = () => {
  const addArticleModalDiclosure = useDisclosure();
  const articles = useAppSelector((state) => state.articles.articles);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredArticles = useMemo(() => {
    let currentArticles = articles;

    if (selectedCategory) {
      currentArticles = currentArticles.filter(
        (article) => article.category === selectedCategory
      );
    }

    if (searchInputValue) {
      currentArticles = currentArticles.filter(
        (article) =>
          article.title.includes(searchInputValue) ||
          article.description.includes(searchInputValue)
      );
    }

    return currentArticles;
  }, [articles, selectedCategory, searchInputValue]);

  return (
    <>
      <AddArticleModal
        isOpen={addArticleModalDiclosure.isOpen}
        onClose={addArticleModalDiclosure.onClose}
      />
      <Box px="35px" py="30px">
        <Flex justify="space-between" alignItems="center">
          <Heading fontSize="2xl">Articles Dashboard</Heading>
          <Button
            h="38px"
            w="138px"
            colorScheme="primary"
            onClick={addArticleModalDiclosure.onOpen}
          >
            + Add Article
          </Button>
        </Flex>
        <Flex>
          <Box pt="30px" w="80%">
            <Flex mb="21px" align="center" justify="space-between">
              <InputGroup maxWidth="365px" mr="2">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  bgColor="white"
                  borderRadius="10px"
                  placeholder="Find articles..."
                  onChange={debounce(
                    (e) => setSearchInputValue(e.target.value),
                    1000
                  )}
                />
              </InputGroup>
              <Flex alignItems="center">
                <Text mr="2" fontSize={['xs','xs','sm','lg']}>
                  Category:
                </Text>
                <Select
                  bgColor="white"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">all</option>
                  {categories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>

            {filteredArticles &&
              filteredArticles.map((article) => (
                <DashboardArticle key={article.id} article={article} />
              ))}
            {!filteredArticles?.length && (
              <Flex h="300px" alignItems="center" justifyContent="center">
                <Text>There are not available articles now</Text>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
