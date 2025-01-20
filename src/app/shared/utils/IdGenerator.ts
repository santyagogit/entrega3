export class IdGenerator {
    private lastId: string;

    constructor() {
        this.lastId = ''; // Inicializa con cadena vacía para empezar en 'a'
    }

    public generateUniqueId(): string {
        if (this.lastId === '') {
            this.lastId = 'a';
        } else {
            let result = '';
            for (let i = 0; i < this.lastId.length; i++) {
                let incrementedCharCode = this.lastId.charCodeAt(i) + 1;
                let incrementedChar = String.fromCharCode(incrementedCharCode);
                result += incrementedChar;
            }
            this.lastId = result;
        }
        return this.lastId;
    }
}