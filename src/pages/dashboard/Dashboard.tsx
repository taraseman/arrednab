import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  InputGroup,
  Heading,
  InputLeftElement,
  Text,
  IconButton,
  Avatar,
  VStack,
  Link,
  useToast,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import AddArticleModal from "./modals/AddArticleModal";
import { ReactComponent as SearchIcon } from "assets/img/icons/search-icon.svg";
import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  doc,
  getDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import firebase from "firebase/database";
import { setArticles } from "service/articlesSlice";
import { useDispatch } from "react-redux";
import { Article } from "types/article-types";

const Dashboard = () => {
  const addArticleModalDiclosure = useDisclosure();
  const articles = useAppSelector((state) => state.articles.articles);
  const dispatch = useDispatch();
  const toast = useToast();

  const [isArticlesLoading, setIsArticlesLoading] = useState(false);

  const getArticles = async () => {
    setIsArticlesLoading(true);

    console.log("mount");
    const db = getDatabase();

    const dbRef = ref(db, "articles");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        console.log(Object.values(snapshot.val()).reverse());
        dispatch(
          setArticles(Object.values(snapshot.val()).reverse() as Article[])
        );
      }
    });

    setIsArticlesLoading(false);
  };

  useEffect(() => {
    getArticles();
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

              <Text>Sort by </Text>
            </Flex>

            {articles &&
              articles.map((article) => (
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
                    <Flex mb="6px" justify="space-between" color="grey.300" align="center">
                      <Text fontSize="18px" >{article.category.toUpperCase()}</Text>
                      <Text fontSize="14px">{new Date(article.created).toLocaleDateString('en-CA')}</Text>
                    </Flex>
                    <Text mb="4px" fontSize="2xl" fontWeight="500">{article.title}</Text>
                    <Text mb="14px" fontSize="lg">{article.description}</Text>

                    <Flex>
                      <Flex alignItems="center">
                      <Avatar
            mr="15px"
            src={article?.authorAvatarUrl ? article.authorAvatarUrl : DefaultAvatarSrc}
            sx={{ width: '36px', height: '36px' }}
          />
          <Text>{article.displayName}</Text>
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
