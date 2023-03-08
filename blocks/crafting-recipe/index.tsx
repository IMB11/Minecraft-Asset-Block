import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import { useState } from "react";
import mcAssetStore from "minecraft-assets";
import ErrorComponent from "../../src/ErrorComponent";
import ShapedRecipeComponent from "./components/ShapedRecipeComponent";

const assets = mcAssetStore();

export default function ExampleFileBlock(props: FileBlockProps) {
  const { context, content, metadata, onUpdateMetadata } = props;
  const language = Boolean(context.path)
    ? getLanguageFromFilename(context.path)
    : "N/A";


  let jsonError = <></>
  let renderer = <></>

  try {
    const data = JSON.parse(content)
    switch (data["type"]) {
      case "crafting_shaped":
      case "minecraft:crafting_shaped":
        renderer = <ShapedRecipeComponent recipe={data} />
        break;
      default:
        jsonError = <ErrorComponent title="Recipe Parse Error" message="Invalid Recipe Type (currently only supports shaped recipes)" />
        break;
    }

  } catch (e: any) {
    jsonError = <ErrorComponent title="Recipe Parse Error" message={e} />
  }

  return (
    <>
      {jsonError}
      {renderer}
      <Box p={4}>
        <Box
          borderColor="border.default"
          borderWidth={1}
          borderStyle="solid"
          borderRadius={6}
          overflow="hidden"
        >
          <Box
            bg="canvas.subtle"
            p={3}
            borderBottomWidth={1}
            borderBottomStyle="solid"
            borderColor="border.default"
          >
            File Contents
          </Box>

          <Box p={4}>
            <pre className="mt-3 p-3">{content}</pre>
          </Box>
        </Box>
      </Box></>
  )
}
