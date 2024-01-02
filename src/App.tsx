import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { FamilyTree } from "./shared/components";

import "reactflow/dist/style.css";
import "./App.css";
import { theme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FamilyTree />
    </ChakraProvider>
  );
}

export default App;
