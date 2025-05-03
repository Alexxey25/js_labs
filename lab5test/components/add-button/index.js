export class AddCardButton {
    constructor(parent) {
        this.parent = parent;
    }

    addCard() {
        const newData = {
            id: this.parent.getData().length + 1,
            src: "https://mxbike.ru/static/catalog/image/124-rc.png",
            title: "KTM RC 390",
            text: "ORANGE BLOOD",
            engine: 390
        };
        
        this.parent.getData().push(newData);
        this.parent.render();
    }
}