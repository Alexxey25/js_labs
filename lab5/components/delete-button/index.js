import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../modules/VehiclesUrls.js";

export class RemoveCardButton {
    constructor(parent) {
        this.parent = parent;
    }

    removeCard() {
        const lastCard = this.parent.data.pop();
        const lastCardId = lastCard.id;

        ajax.delete(VehiclesU.removeVehicleById(lastCardId), () => {
            this.parent.getData(() => {
                this.parent.render();
            });
        });
    }
}
