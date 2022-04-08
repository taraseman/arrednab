import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import EditInformationForm from "./components/EditInformationForm";
import EditPasswordForm from "./components/EditPasswordForm"
import EditAvatarForm from "./components/EditAvatarForm";

const CustomTab = styled(Tab)`
  &[aria-selected="true"] {
    border-color: var(--chakra-colors-primary-700);
    color: var(--chakra-colors-primary-700);
    font-weight: 500;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal = ({ isOpen, onClose }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Modal
      isOpen={isOpen}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent minH="400px" p="10px">
        <ModalHeader color="grey.600" fontWeight="500" fontSize="xl" pb="32px">
          Manage your account
        </ModalHeader>
        <ModalBody>
          <Tabs onChange={(index) => setTabIndex(index)}>
            <TabList>
              <CustomTab>Edit Information</CustomTab>
              <CustomTab>User Avatar </CustomTab>
              <CustomTab>Change Password</CustomTab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <EditInformationForm onClose={onClose} tabIndex={tabIndex} />
              </TabPanel>
              <TabPanel>
              <EditAvatarForm onClose={onClose} tabIndex={tabIndex}/>
              </TabPanel>
              <TabPanel>
                <EditPasswordForm onClose={onClose} tabIndex={tabIndex}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
