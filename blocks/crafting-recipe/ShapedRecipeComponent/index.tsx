import { Button, Box } from "@primer/react";
import { Tooltip } from 'react-tooltip'
import { missingTexture, getTextureURL, blockBaseURL, arrowURL, urlExists } from "../../../src/TextureURLCreator";

import './ShapedRecipeComponent.css'
import 'react-tooltip/dist/react-tooltip.css'


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
            resultImage = (<div><img className="is-item" data-tooltip-id={resultID[1]} src={resultItemTex} width={60} height={60} data-tooltip-content={recipe["result"]["item"]} />
                <Tooltip noArrow={true} id={resultID[1]} className="item-tooltip minecraft-tooltip" /></div>)
        } else {

            let blockRenderURL = `${blockBaseURL}${resultID[1]}.png`

            if (!urlExists(blockRenderURL)) {
                let resultItemTex = getTextureURL("/block/" + resultID[1] + ".png")
                resultImage = (<div><img className="is-item" data-tooltip-id={resultID[1]} src={resultItemTex} width={60} height={60} data-tooltip-content={recipe["result"]["item"]} />
                    <Tooltip noArrow={true} id={resultID[1]} className="item-tooltip minecraft-tooltip" /></div>)
            } else {
                resultImage = (<div><img data-tooltip-id={resultID[1]} src={`${blockBaseURL}${resultID[1]}.png`} width={60} height={60} data-tooltip-content={recipe["result"]["item"]} />
                    <Tooltip noArrow={true} id={resultID[1]} className="item-tooltip minecraft-tooltip" /></div>)
            }
        }
    } else {
        resultImage = (<div><img data-tooltip-id={resultID[1]} className="is-item" src={resultItemTex} width={60} height={60} data-tooltip-content={recipe["result"]["item"]} />
            <Tooltip noArrow={true} id={resultID[1]} className="item-tooltip minecraft-tooltip" /></div>)
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
                                if (!item) {
                                    return (<div></div>)
                                }

                                const identifier = item.split(":")

                                const itemTex = getTextureURL("/item/" + identifier[1] + ".png")

                                if (itemTex == missingTexture) {
                                    if (identifier[0] !== "minecraft") {
                                        return (<div><img className="is-item" data-tooltip-id={identifier[1]} src={itemTex} data-tooltip-content={item} />
                                            <Tooltip noArrow={true} id={identifier[1]} className="item-tooltip minecraft-tooltip" /></div>)
                                    } else {
                                        return (<div><img data-tooltip-id={identifier[1]} src={`${blockBaseURL}${identifier[1]}.png`} width={60} height={60} data-tooltip-content={item} />
                                            <Tooltip noArrow={true} id={identifier[1]} className="item-tooltip minecraft-tooltip" /></div>)
                                    }
                                } else {
                                    return (<div>
                                        <img className="is-item" data-tooltip-id={identifier[1]} src={itemTex} data-tooltip-content={item} />
                                        <Tooltip noArrow={true} id={identifier[1]} className="item-tooltip minecraft-tooltip" />
                                    </div>)
                                }
                            }))}
                        </div>
                    </div>
                    <img src={arrowURL} className="arrowImage" />
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