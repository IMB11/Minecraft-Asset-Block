import Identifier from "./identifier"
import { string_arr, string_arr_2, string_arr_3 } from "./typedefs"

export interface Recipe {
    type: string
    group: string
}

export interface Ingredient {
    item?: Identifier
    tag?: Identifier
}

export interface CookingRecipe extends Recipe {
    type: "blasting" | "campfire_cooking" | "smelting" | "smoking"
    ingredient: Ingredient | Ingredient[]
    result: Identifier
    experience: number
    cookingTime?: number
}

export interface CraftingKey {
    [key: string]: Ingredient | Ingredient[]
}

export interface CraftingResult {
    count?: number
    item: Identifier
}

export interface CraftingShaped extends Recipe {
    type: "crafting_shaped"
    key: CraftingKey
    pattern: string_arr_3 | string_arr_2 | string_arr
    result: CraftingResult
}

export interface CraftingShapeless extends Recipe {
    type: "crafting_shapeless"
    ingredients: Ingredient | Ingredient[]
    result: CraftingResult
}

export interface SmithingRecipe extends Recipe {
    type: "smithing"
    base: Ingredient
    addition: Ingredient
    result: Identifier
}

export interface StonecuttingRecipe extends Recipe {
    ingredient: Ingredient | Ingredient[]
    result: Identifier
    count: number
}