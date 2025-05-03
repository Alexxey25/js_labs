import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../modules/VehiclesUrls.js";

export class AddCardButton {
    constructor(parent) {
        this.parent = parent;
    }
    addCard() {
        const newData = {
            id: 0,
            src: "https://mxbike.ru/static/catalog/image/124-rc.png",
            title: "KTM RC 390",
            text: "ORANGE BLOOD",
            engine: 390
        };
    
        ajax.post(VehiclesU.createVehicle(), newData, () => {
            this.parent.getData();
        });
    }
    
}