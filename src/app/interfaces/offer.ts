export interface Offer {
    // time of date in unix timestamp format
    publishDate: number;
    priceForDay: number;
    avialableFor: number;
    pickupLocation: string;
    offerDescription: string;
    car: {
        carBrand: string;
        brandModel: string;
        carProductionDate: number;
        availvableSeats: number;
        gearboxType: string;
        fuelType: string;
    };
}
