import { Button, Box } from "@primer/react";
import './ShapedRecipeComponent.css'
import { missingTexture, getTextureURL, blockBaseURL } from "../../../src/TextureURLCreator";
import { useState } from "react";
import arrowImage from "./arrowImage.png"


export default function ShapedRecipeComponent(props: {
    recipe: any
}) {
    const keys: any = {}

    const recipe = props.recipe

    for (const [key, value] of Object.entries(recipe["key"])) {
        if (value.item !== undefined) {
            keys[key] = value.item
        }
    }

    const rows: any[][] = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let rowIndex = 0
    recipe["pattern"].forEach((row: string) => {
        let charIndex = 0
        Array.from(row).forEach(char => {
            rows[rowIndex][charIndex] = keys[char]
            charIndex++;
        });
        rowIndex++;
    });

    let resultImage = <></>
    let resultID = recipe["result"]["item"].split(":")

    const resultItemTex = getTextureURL("/item/" + resultID[1] + ".png")

    if (resultItemTex == missingTexture) {
        if (resultID[0] !== "minecraft") {
            <div><img src={`${blockBaseURL}${resultID[1]}.png`} width="30" height="30" /></div>
        } else {
            resultImage = (<div><img src={resultItemTex} width="30" height="30" /></div>)
        }
    } else {
        resultImage = (<div><img src={resultItemTex} width="30" height="30" /></div>)
    }

    return (<>
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
                    Shaped Crafting Recipe
                </Box>

                <Box p={4} className="recipe-container">
                    <div>
                        <div className="recipe-grid-shaped">
                            {rows.map(row => row.map(item => {
                                if (item == undefined) {
                                    return (<div></div>)
                                }

                                const identifier = item.split(":")

                                const itemTex = getTextureURL("/item/" + identifier[1] + ".png")

                                if (itemTex == missingTexture) {
                                    if (identifier[0] !== "minecraft") {
                                        return (<div><img src={itemTex} width="30" height="30" /></div>)
                                    } else {
                                        return (<div><img src={`${blockBaseURL}${identifier[1]}.png`} width="30" height="30" /></div>)
                                    }
                                } else {
                                    return (<div><img src={itemTex} width="30" height="30" /></div>)
                                }
                            }))}
                        </div>
                    </div>
                    <img src={arrowImage} className="arrowImage" />
                    <div>
                        <div className="slot">
                            {resultImage}
                        </div>
                    </div>
                </Box>
            </Box>
        </Box >

    </>)
}