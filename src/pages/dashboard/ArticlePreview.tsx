import {
  Box,
  Flex,
  Button,
  Text,
  Divider,
  Avatar,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { getDatabase, ref, push, set } from "firebase/database";
import { FirebaseError } from "@firebase/util";
import DashboardArticle from "./DashboardArticle";
import { useParams } from "react-router-dom";
import useRoleCheck from "hooks/role-check";
import Comment from "./Comment";

const ArticlePreview = () => {
  const isPUser = useRoleCheck(["pUser"]);
  const articles = useAppSelector((state) => state.articles.articles);
  const loggedUser = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [commentMessage, setCommentMessage] = useState("");

  const article = articles?.find((currentArticle) => currentArticle.id === id);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      if (article && loggedUser?.id) {
        const db = getDatabase();
        const commentListRef = await ref(db, `articles/${article.id}/comments`);
        const newCommentRef = await push(commentListRef);

        await set(newCommentRef, {
          id: newCommentRef.ref.key,
          authorId: loggedUser.id,
          message: commentMessage,
          created: Date.now(),
        });
        setCommentMessage("");
        toast({
          status: "success",
          description: "Comment posted successfully",
        });
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError)
        toast({
          status: "error",
          description: error.message,
        });
    }

    setIsLoading(false);
  };

  return (
    <Box px={["30px", "50px", "100px", "100px"]} py="30px">
      <Flex>
        {article ? (
          <Box pt="30px" w="100%">
            <DashboardArticle article={article} />

            <Divider opacity="0.4" borderColor="grey.300" />
            <Flex mb="2" py="2" justify="space-between">
              <Flex alignItems="flex-end">
                <Text lineHeight="18px" fontSize="xl" fontWeight="500" mr="2">
                  {article?.comments ? Object.keys(article.comments).length : 0}
                </Text>
                <Text lineHeight="14px">comments</Text>
              </Flex>

              {isPUser && (
                <Button
                  colorScheme="primary"
                  as="a"
                  href={`mailto:${users[article.authorId].email}`}
                >
                  Request author CV
                </Button>
              )}
            </Flex>

            <Flex mb="2" alignItems="center">
              <Avatar
                mr="15px"
                src={
                  loggedUser?.photoUrl ? loggedUser.photoUrl : DefaultAvatarSrc
                }
                sx={{ width: "48px", height: "48px", cursor: "pointer" }}
              />
              <Textarea
                backgroundColor="white"
                placeholder="Write your comment..."
                value={commentMessage}
                maxLength={1000}
                onChange={(e) => setCommentMessage(e.target.value)}
              />
            </Flex>

            <Flex mb="30px" justify="space-between" alignItems="center">
              <Button onClick={() => setCommentMessage("")} variant="link">
                Reset
              </Button>
              <Button
                onClick={() => onSubmit()}
                isDisabled={!commentMessage.length}
                colorScheme="primary"
                isLoading={isLoading}
              >
                Comment
              </Button>
            </Flex>

            {article?.comments && (
              <Box>
                {Object.values(article.comments)
                  .reverse()
                  .map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      articleId={article.id}
                    />
                  ))}
              </Box>
            )}
          </Box>
        ) : (
          <Flex h="300px" w="100%" justifyContent="center" alignItems="center">
            <Text>Article is not available</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ArticlePreview;
