export class RemoveCardButton {
    constructor(parent) {
        this.parent = parent;
    }

    removeCard() {
        if (this.parent.getData().length > 0) {
            this.parent.data.pop();
            this.parent.render();
        }
    }
}