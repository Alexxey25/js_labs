import { ajax } from "../../modules/ajax.js";
import { VehiclesU } from "../../modules/VehiclesUrls.js";

export class RemoveCardButton {
    constructor(parent) {
        this.parent = parent;
    }

    async removeCard() {
        const lastCard = this.parent.data.pop();
        if (!lastCard) return;
        const lastCardId = lastCard.id;
        
        try {
            await fetch(VehiclesU.removeVehicleById(lastCardId), {
                method: 'DELETE',
            });

            await this.parent.getData();
            this.parent.render();
        } catch (err) {
            console.error("Ошибка при удалении:", err);
        }
    }
}
