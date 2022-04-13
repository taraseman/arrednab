import {
  Box,
  Flex,
  Button,
  Image,
  InputGroup,
  Heading,
  InputLeftElement,
  Text,
  Avatar,
  useToast,
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
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { getDatabase, ref, onValue } from "firebase/database";
import { setArticles } from "service/articlesSlice";
import { setUsers } from "service/allUsersSlice";
import { useAppDispatch } from "hooks/redux";
import { Article } from "types/article-types";
import { categoryies } from "config/constants";
import { debounce } from 'lodash';

const Dashboard = () => {
  const addArticleModalDiclosure = useDisclosure();
  const articles = useAppSelector((state) => state.articles.articles);
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [isArticlesLoading, setIsArticlesLoading] = useState(true);

  const [isUsersLoading, setIsUsersLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSearchInput = () => {
    
  }

  const filter = (articles: Article[]) => {
    return articles.filter(article => article.category === selectedCategory)
  }

  const filteredArticles = useMemo(() => {
    if(selectedCategory) {
      return articles.filter(article => article.category === selectedCategory)
    }
    return articles;
    
  }, [articles, selectedCategory])

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
    setIsUsersLoading(true);
    const db = getDatabase();

    const dbRef = ref(db, "users");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val()) {
        dispatch(setUsers(snapshot.val()));
      }
    });

    setIsUsersLoading(false);
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
                />
              </InputGroup>
              <Flex alignItems="center">
                <Text mr="2" fontSize="lg">
                  Category:
                </Text>
                <Select bgColor="white" onChange={(e)=> setSelectedCategory(e.target.value)}>
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
                <Box
                  key={article.id}
                  borderRadius="6px"
                  backgroundColor="white"
                  mb="30px"
                  boxShadow="md"
                >
                  <Image
                    borderTopRadius="6px"
                    src={article.imageUrl}
                    sx={{ width: "100%" }}
                  />
                  <Box p="15px 25px 16px 24px">
                    <Flex
                      mb="6px"
                      justify="space-between"
                      color="grey.300"
                      align="center"
                    >
                      <Text fontSize="18px">
                        {article.category.toUpperCase()}
                      </Text>
                      <Text fontSize="14px">
                        {new Date(article.created).toLocaleDateString("en-CA")}
                      </Text>
                    </Flex>
                    <Text mb="4px" fontSize="2xl" fontWeight="500">
                      {article.title}
                    </Text>
                    <Text mb="14px" fontSize="lg">
                      {article.description}
                    </Text>

                    <Flex>
                      <Flex alignItems="center">
                        <Avatar
                          mr="15px"
                          src={
                            users[article.authorId]?.photoUrl
                              ? users[article.authorId]?.photoUrl
                              : DefaultAvatarSrc
                          }
                          sx={{ width: "36px", height: "36px" }}
                        />
                        <Text>
                          {users[article.authorId].firstName +
                            " " +
                            users[article.authorId].lastName}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              ))}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
