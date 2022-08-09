import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { Article } from "types/article-types";
import useRoleCheck from "hooks/role-check";
import EditArticleModal from "./modals/EditArticleModal";
import ConfirmDeleteModal from "components/modals/ConfirmDeleteModal";
import { getDatabase, ref, remove } from "firebase/database";
import { useHistory } from "react-router-dom";

interface Props {
  article: Article;
}

const DashboardArticle = ({ article }: Props) => {
  const users = useAppSelector((state) => state.users.users);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const loginedUserId = useAppSelector((state) => state.auth.id);
  const editArticleDisclosure = useDisclosure();
  const history = useHistory();

  const isWithoutSeeMoreButton = article.description.length <= 160;

  const isAdmin = useRoleCheck(["admin"]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const removeArticle = async (deleteId: string) => {
    const db = getDatabase();
    await remove(ref(db, `articles/${deleteId}`));
  };

  return (
    <>
      <ConfirmDeleteModal
        title="Do you really want to delete this article?"
        successMessage="Article deleted successfully"
        deleteAction={async () => {
          if (!deleteId) return;
          removeArticle(deleteId);
        }}
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
      />
      <EditArticleModal
        isOpen={editArticleDisclosure.isOpen}
        onClose={editArticleDisclosure.onClose}
        article={article}
      />
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
          _hover={{ cursor: "pointer" }}
          onClick={() => history.push(`/dashboard/${article.id}`)}
        />
        <Box p="15px 25px 16px 24px">
          <Flex
            mb="6px"
            justify="space-between"
            color="grey.300"
            align="center"
          >
            <Text fontSize="18px">{article.category.toUpperCase()}</Text>
            <Text fontSize="14px">
              {new Date(article.created).toLocaleDateString("en-CA")}
            </Text>
          </Flex>
          <Text mb="4px" fontSize="2xl" fontWeight="500">
            {article.title}
          </Text>
          {isWithoutSeeMoreButton ? (
            <Text mb="14px" fontSize="lg">
              {article.description}
            </Text>
          ) : (
            <Text
              h={isDescriptionOpen ? "auto" : "1.3em"}
              mb="14px"
              fontSize="lg"
              overflow="hidden"
              whiteSpace={isDescriptionOpen ? "normal" : "nowrap"}
              textOverflow="ellipsis"
            >
              {article.description}
            </Text>
          )}

          <Flex justify="space-between" alignItems="center">
            <Flex alignItems="center">
              {users && (
                <Flex alignItems="center" mr="4">
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
                    <Text color="grey.300" as="span">
                      {users[article.authorId].role === "pUser"
                        ? " (professional)"
                        : ""}
                    </Text>
                  </Text>
                </Flex>
              )}

              {(article.authorId === loginedUserId || isAdmin) && (
                <Flex flexWrap="wrap">
                  <Button
                    onClick={() => editArticleDisclosure.onOpen()}
                    mr="2"
                    variant="link"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => setDeleteId(article.id)}
                    variant="link"
                  >
                    Delete
                  </Button>
                </Flex>
              )}
            </Flex>

            {!isWithoutSeeMoreButton && (
              <Button
                variant="link"
                onClick={() => setIsDescriptionOpen((prevValue) => !prevValue)}
              >
                {isDescriptionOpen ? "Hide" : "Read more"}
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DashboardArticle;
