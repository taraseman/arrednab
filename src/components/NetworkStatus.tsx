import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import getArticles from "service/get-data-fanctions/get-articles";
import getUsers from "service/get-data-fanctions/get-users";
import { useAppDispatch } from "hooks/redux";

const NetStatusNotification = (isOnline: boolean, message: string) => {
  if (isOnline) {
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.error(message, {
      position: "top-center",
      autoClose: undefined,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
};

const NetworkStatus = () => {
  const dispatch = useAppDispatch();

  window.addEventListener("load", () => {
    window.addEventListener("online", async () => {
      NetStatusNotification(true, "You are online back !!");
      await getArticles(dispatch);
      await getUsers(dispatch);
    });

    window.addEventListener("offline", () => {
      NetStatusNotification(false, "Lost Network Connection !!");
    });
  });

  return <></>;
};

export default NetworkStatus;
