import { useCallback, useState } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  OnNodesChange,
  applyEdgeChanges,
  applyNodeChanges,
  OnEdgesChange,
  BackgroundVariant,
} from "reactflow";
import { v4 as uuid } from "uuid";
import {
  Container,
  Flex,
  Button,
  Input,
  Switch,
  Spacer,
} from "@chakra-ui/react";

import { FamilyMember } from "./index";
import { Gender } from "../types";

const nodeTypes = {
  familyMember: FamilyMember,
};

const FamilyTree = () => {
  const [members, setMembers] = useState<Node[]>([]);
  const [relationships, setRelationships] = useState<Edge[]>([]);
  const [newFamilyMemberName, setNewFamilyMemberName] = useState<String>("");
  const [gender, setGender] = useState(Gender.Male);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleFamilyMemberInputNameChange = (e: any) => {
    setNewFamilyMemberName(e.target.value);
  };

  const handleFamilyMemberSubmit = (e: any) => {
    if (e.key === "Enter") handleAddNewFamilyMember();
  };

  const handleAddNewFamilyMember = () => {
    const removeFamilyMember = (id: string) => {
      setMembers((members) => members.filter((node) => node.id !== id));
    };

    setMembers((members) => [
      ...members,
      {
        id: uuid(),
        data: {
          name: newFamilyMemberName,
          gender,
          removeFamilyMember,
        },
        position,
        type: "familyMember",
      },
    ]);
    setPosition({ x: position.x + 16, y: position.y + 16 });
  };

  const handleToggleGender = () => {
    setGender(gender === Gender.Male ? Gender.Female : Gender.Male);
  };

  const handleFamilyMembersChange: OnNodesChange = useCallback(
    (changes) => setMembers((nds) => applyNodeChanges(changes, nds)),
    [setMembers]
  );
  const handleFamilyRelationshipsChange: OnEdgesChange = useCallback(
    (changes) => setRelationships((eds) => applyEdgeChanges(changes, eds)),
    [setRelationships]
  );

  const handleConnect = useCallback(
    (params: Edge | Connection) =>
      setRelationships((els) => addEdge({ ...params }, els)),
    [setRelationships]
  );

  return (
    <Container w="100%" h="100%" maxW="container.lg">
      <Flex
        padding="12px"
        alignItems="center"
        position="sticky"
        top={0}
        zIndex={1}
        background="white"
        boxShadow="sm"
      >
        <Input
          borderRightRadius={0}
          placeholder="Enter a name"
          onChange={handleFamilyMemberInputNameChange}
          onKeyDown={handleFamilyMemberSubmit}
        />
        <Button
          borderLeftRadius={0}
          paddingLeft="24px"
          paddingRight="24px"
          colorScheme="blue"
          onClick={handleAddNewFamilyMember}
        >
          +
        </Button>
        <Spacer minWidth="16px" />
        <Switch colorScheme="red" size="lg" onChange={handleToggleGender} />
      </Flex>
      <ReactFlow
        nodes={members}
        edges={relationships}
        onNodesChange={handleFamilyMembersChange}
        onEdgesChange={handleFamilyRelationshipsChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="gray" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </Container>
  );
};

export default FamilyTree;
