import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";

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
  window.addEventListener("load", () => {
  
    window.addEventListener("online", () => {
      NetStatusNotification(true, "You are online back !!");
    });

    window.addEventListener("offline", () => {
      console.log("off");
      NetStatusNotification(false, "Lost Network Connection !!");
    });
  });

  return <Box />;
};

export default NetworkStatus;
