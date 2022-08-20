import { Box, Flex, Button, Text, Avatar } from "@chakra-ui/react";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { Comment as CommentT } from "types/article-types";
import useRoleCheck from "hooks/role-check";
import ConfirmDeleteModal from "components/modals/ConfirmDeleteModal";
import { getDatabase, ref, remove } from "firebase/database";

interface Props {
  comment: CommentT;
  articleId: string;
}

const Comment = ({ comment, articleId }: Props) => {
  const users = useAppSelector((state) => state.users.users);
  const isAdmin = useRoleCheck(["admin"]);
  const loginedUserId = useAppSelector((state) => state.auth.id);

  const removeComment = async (deleteId: string) => {
    const db = getDatabase();
    await remove(ref(db, `articles/${articleId}/comments/${deleteId}`));
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <>
      <ConfirmDeleteModal
        title="Do you really want to delete this comment?"
        successMessage="Comment removed successfully"
        deleteAction={async () => {
          if (!deleteId) return;
          removeComment(deleteId);
        }}
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
      />
      {users && (
        <Flex mb="30px">
          <Avatar
            mr="15px"
            src={
              users[comment.authorId]?.photoUrl
                ? users[comment.authorId]?.photoUrl
                : DefaultAvatarSrc
            }
            sx={{ width: "48px", height: "48px" }}
          />
          <Box w="100%">
            <Flex
              mb="6px"
              justify="space-between"
              alignItems="center"
              color="grey.300"
              align="center"
            >
              <Flex justify="space-between">
                <Text fontWeight="500" mr="2">
                  {users[comment.authorId].firstName +
                    " " +
                    users[comment.authorId].lastName}
                </Text>
                <Text fontSize="14px">
                  {new Date(comment.created).toLocaleDateString("en-CA")}
                </Text>
              </Flex>
              {comment.authorId === loginedUserId || isAdmin ? (
                <Button onClick={() => setDeleteId(comment.id)} variant="link">
                  Delete
                </Button>
              ) : (
                <Text>
                  {users[comment.authorId].role === "pUser"
                    ? "professional"
                    : ""}
                </Text>
              )}
            </Flex>
            <Text fontSize="lg">{comment.message}</Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Comment;
