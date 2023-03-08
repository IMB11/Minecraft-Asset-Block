import { Button, Box } from "@primer/react";
import './ShapedRecipeComponent.css'
import { missingTexture, getTextureURL } from "../../../src/TextureURLCreator";
import { useState } from "react";


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

                <Box p={4}>
                    <div className="recipe-grid-shaped">
                        {rows.map(row => row.map(item => {
                            if (item == undefined) {
                                return (<div></div>)
                            }

                            const identifier = item.split(":")

                            const itemTex = getTextureURL("/item/" + identifier[1] + ".png")

                            if (itemTex == missingTexture) {
                                if (identifier[0] !== "minecraft") {
                                    return (<div><img src={itemTex} /></div>)
                                } else {
                                    return (<div><img src={`/public/rendered-blocks/${identifier[1]}.png`} /></div>)
                                }
                            } else {
                                return (<div><img src={itemTex} /></div>)
                            }
                        }))}
                    </div>
                </Box>
            </Box>
        </Box>

    </>)
}