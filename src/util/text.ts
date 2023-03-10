import { latest_mc_version } from "./typedefs";
import 'whatwg-fetch'

const language_file_folder_url = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/" + latest_mc_version + "/assets/minecraft/lang"
const language_file_list_url = language_file_folder_url + "/_list.json"


const language_entries: Map<String, Map<String, String>> = ((): Map<String, Map<String, String>> => {
    let buildingMap = new Map<String, Map<String, String>>()
    fetch(language_file_list_url)
        .then(data => data.json())
        .then((content: { directories: string[], files: string[] }) => {
            content.files.forEach((fileName: string) => {
                console.debug("Loading Translations - " + fileName)
                const url = language_file_folder_url + "/" + fileName
                fetch(url).then(data => data.json()).then(contents => {
                    buildingMap.set(fileName.replace(".json", ""), new Map<String, String>(Object.entries(contents)))
                })
            })
        })
    return buildingMap;
})()



let currentLanguage = "en_us"

export function setCurrentLanguage(lang: string) {
    currentLanguage = lang;
}

export function getTranslation(key: string, lang: string = currentLanguage): string {
    return language_entries[lang][key]
}

export interface TextObject {
    block?: string;
    bold?: boolean;
    /**
     * Action to perform when this text is left clicked on
     */
    clickEvent?: TextOnClick;
    color?: MinecraftColors;
    entity?: any;
    /**
     * These items inherit from the base component in styling, such as text colour and italics
     */
    extra?: TextComponent[];
    /**
     * What to show upon a hover
     */
    hoverEvent?: any;
    /**
     * When the player SHIFT-clicks on a section of text, what to add to their chat window
     */
    insertion?: string;
    interpret?: boolean;
    italic?: boolean;
    keybind?: string;
    nbt?: string;
    /**
     * This makes the text cycle through characters with the same width
     */
    obfuscated?: boolean;
    score?: any;
    /**
     * If there are multiple, they will be comma seperated until the last value with an 'and'
     */
    selector?: string;
    strikethrough?: boolean;
    text?: string;
    translate?: string;
    underlined?: boolean;
    /**
     * Extra items to apply in place of %s and %{x}$s in the translation string. These items
     * inherit from the base component in styling, such as text colour and italics
     */
    with?: TextComponent[];
}

export type TextComponent = TextComponent[] | TextObject | string;

/**
 * Action to perform when this text is left clicked on
 */
export interface TextOnClick {
    /**
     * open_url opens the web address in value, run_command runs the command in value (use
     * /trigger), change_page changes the book page, and suggest_command replaces the player's
     * chat window
     */
    action?: ClickAction;
}

/**
 * open_url opens the web address in value, run_command runs the command in value (use
 * /trigger), change_page changes the book page, and suggest_command replaces the player's
 * chat window
 */
export enum ClickAction {
    ChangePage = "change_page",
    Openurl = "open_url",
    RunCommand = "run_command",
    SuggestCommand = "suggest_command",
}

export enum MinecraftColors {
    Aqua = "aqua",
    Black = "black",
    Blue = "blue",
    DarkAqua = "dark_aqua",
    DarkBlue = "dark_blue",
    DarkGray = "dark_gray",
    DarkGreen = "dark_green",
    DarkPurple = "dark_purple",
    DarkRed = "dark_red",
    Gold = "gold",
    Gray = "gray",
    Green = "green",
    LightPurple = "light_purple",
    Red = "red",
    Reset = "reset",
    White = "white",
    Yellow = "yellow",
}

export function createLiteralText(input: TextObject[]): TextComponent {
    return [...input]
}