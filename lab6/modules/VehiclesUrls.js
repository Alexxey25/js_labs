class VehiclesUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000'; 
    }

    getVehicles() {
        return `${this.baseUrl}/vehicles`; 
    }

    getVehicleById(id) {
        return `${this.baseUrl}/vehicles/${id}`;
    }

    createVehicle() {
        return `${this.baseUrl}/vehicles`;
    }

    removeVehicleById(id) {
        return `${this.baseUrl}/vehicles/${id}`;
    }

    updateVehicleById(id) {
        return `${this.baseUrl}/vehicles/${id}`;
    }
}

export const VehiclesU = new VehiclesUrls();
