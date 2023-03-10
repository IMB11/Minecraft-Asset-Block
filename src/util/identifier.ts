export default class Identifier {
    public namespace: string;
    public path: string;
    constructor(value: string) {
        let splitValue = value.split(":")
        if (splitValue.length != 2) {
            this.namespace = "minecraft"
            this.path = splitValue[0]
            return
        }
        this.namespace = splitValue[0]
        this.path = splitValue[1]
    }
}