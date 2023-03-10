const latest = "1.19.3"
const baseURL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/" + latest + "/assets/minecraft/textures/"
export const missingTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEXGM8U1DTTFMsP7QPn9QPvdONseCB4AAAD/Qf3fOd0dBx0cBxwdCB3eOdzcONr9Qfv////gND38AAAAA3RSTlP+/v6VFoksAAAAAWJLR0QQlbINLAAAAAd0SU1FB+cDCBQoC5QhrysAAAA9SURBVBjTtczJDQAgDANBA+EMkP67RTKkBOa5soxEkku98CUItT48ZOoIOgmFRohrE95SVzPyMLfd+y/hAD6ZBpGKbccsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTAzLTA4VDIwOjQwOjAzKzAwOjAwhf5/5gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMy0wOFQyMDo0MDowMyswMDowMPSjx1oAAAAASUVORK5CYII="

export function urlExists(url: string): boolean {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status == 200;
}

export function getTextureURL(location: string): string {
    location = baseURL + location;

    if (urlExists(location)) {
        return location;
    }

    return missingTexture;
}

export const blockBaseURL = "https://raw.githubusercontent.com/mineblock11/Minecraft-Asset-Block/main/assets/rendered-blocks/"
export const arrowURL = "https://raw.githubusercontent.com/mineblock11/Minecraft-Asset-Block/main/assets/arrowImage.png"