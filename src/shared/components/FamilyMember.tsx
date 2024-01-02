import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import {
  Avatar,
  Flex,
  Spacer,
  Text,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { v4 as uuid } from "uuid";
import { Gender } from "../types";

interface FamilyMemberProps {
  id: string;
  data: {
    name: string;
    gender: Gender;
    removeFamilyMember: (id: string) => void;
  };
}

const backgroundColor = {
  [Gender.Male]: "blue.400",
  [Gender.Female]: "red.400",
};

const FamilyMemberImage = () => {
  const [image, setImage] = useState<string>("");
  const inputId = uuid();

  const handleImageChange = (event: any) => {
    if (event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Flex>
      <label htmlFor={inputId}>
        <Avatar width="32px" height="32px" src={image} cursor="pointer" />
      </label>
      <Input
        type="file"
        id={inputId}
        display="none"
        onChange={handleImageChange}
      />
    </Flex>
  );
};

const FamilyMember = ({
  id,
  data: { name, gender, removeFamilyMember },
}: FamilyMemberProps) => {
  const handleRemoveFamilyMember = () => {
    removeFamilyMember(id);
  };

  return (
    <Flex
      padding="4px"
      width="100%"
      borderRadius="8px"
      backgroundColor={backgroundColor[gender]}
      boxShadow="lg"
      alignItems="center"
      position="relative"
      paddingTop="8px"
    >
      <IconButton
        icon={<SmallCloseIcon />}
        aria-label="Close"
        backgroundColor="transparent"
        position="absolute"
        top={0}
        left={0}
        size="xs"
        onClick={handleRemoveFamilyMember}
      />
      <Text color="white">{name}</Text>
      <Spacer minW="8px" />
      <FamilyMemberImage />
      <Handle id="top" type="target" position={Position.Top} isConnectable />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        isConnectable
      />
      <Handle id="left" type="target" position={Position.Left} isConnectable />
    </Flex>
  );
};

export default memo(FamilyMember);
