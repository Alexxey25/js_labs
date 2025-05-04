import { CustomizePage } from "../../pages/customize/index.js";

export class AddCardButton {
    constructor(parent) {
        this.parent = parent;
    }
    addCard() {
        const customizePage = new CustomizePage(this.parent, null);
        customizePage.render();
    }
    
}