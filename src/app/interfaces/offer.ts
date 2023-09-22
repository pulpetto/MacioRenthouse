export interface Offer {
    // time of date in unix timestamp format
    publishDate: number;
    priceForDay: number;
    availableFor: number;
    pickupLocation: string;
    offerDescription: string;
    images: string[];
    car: {
        carBrand: string;
        brandModel: string;
        carProductionDate: number;
        availableSeats: number;
        gearboxType: string;
        fuelType: string;
    };
}
