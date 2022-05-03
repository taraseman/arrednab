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
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import AddArticleModal from "./modals/AddArticleModal";
import { ReactComponent as SearchIcon } from "assets/img/icons/search-icon.svg";
import { useAppSelector } from "hooks/redux";
import { useEffect, useMemo, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { setArticles } from "service/articlesSlice";
import { setUsers } from "service/allUsersSlice";
import { useAppDispatch } from "hooks/redux";
import { Article } from "types/article-types";
import { categoryies } from "config/constants";
import { debounce } from "lodash";
import DashboardArticle from "./DashboardArticle";

const Dashboard = () => {
  const addArticleModalDiclosure = useDisclosure();
  const articles = useAppSelector((state) => state.articles.articles);
  const dispatch = useAppDispatch();

  const [isArticlesLoading, setIsArticlesLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredArticles = useMemo(() => {
    let currentArticles = articles;

    if (selectedCategory) {
      currentArticles = articles.filter(
        (article) => article.category === selectedCategory
      );
    }

    if (searchInputValue) {
      currentArticles = articles.filter(
        (article) =>
          article.title.includes(searchInputValue) ||
          article.description.includes(searchInputValue)
      );
    }

    return currentArticles;
  }, [articles, selectedCategory, searchInputValue]);

  const getArticles = async () => {
    setIsArticlesLoading(true);
    const db = getDatabase();
    const dbRef = ref(db, "articles");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        dispatch(
          setArticles(Object.values(snapshot.val()).reverse() as Article[])
        );
      }
    });

    setIsArticlesLoading(false);
  };

  const getUsers = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "users");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val()) {
        dispatch(setUsers(snapshot.val()));
      }
    });
  };

  useEffect(() => {
    getArticles();
    getUsers();
  }, []);


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
              <InputGroup w="365px">
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
                <Text mr="2" fontSize="lg">
                  Category:
                </Text>
                <Select
                  bgColor="white"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">all</option>
                  {categoryies.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
            {isArticlesLoading && (
              <Stack>
                <Skeleton mb="30px" height="300px" borderRadius="6px" />
                <Skeleton mb="30px" height="300px" borderRadius="6px" />
                <Skeleton mb="30px" height="300px" borderRadius="6px" />
              </Stack>
            )}

            {filteredArticles &&
              !isArticlesLoading &&
              filteredArticles.map((article) => (
                <DashboardArticle article={article} />
              ))}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
