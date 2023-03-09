import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { useState } from "react";
import ErrorComponent from "../../src/components/ErrorComponent";
import FileContents from "../../src/components/FileContentsComponent"
import ShapedRecipeComponent from "./ShapedRecipeComponent";
import '../main.css'

export default function ExampleFileBlock(props: FileBlockProps) {
  const { context, content, metadata, onUpdateMetadata } = props;
  const language = Boolean(context.path)
    ? getLanguageFromFilename(context.path)
    : "N/A";


  let jsonError
  let renderer

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
    jsonError = <ErrorComponent title="Recipe Parse Error" message={e.toString()} />
  }

  if (jsonError) {
    return (<>
      {jsonError}
    </>)
  }

  return (
    <>
      {jsonError}
      {renderer}
      <FileContents readonly={!props.isEditable} contents={props.content} onChange={(newContents: string) => {
        props.onUpdateContent(newContents)
      }} />
    </>
  )
}
