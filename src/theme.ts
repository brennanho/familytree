import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const switchTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    track: {
      bg: "blue.400",
      _checked: {
        bg: "red.400",
      },
    },
  }),
});

export const theme = extendTheme({
  components: { Switch: switchTheme },
});
