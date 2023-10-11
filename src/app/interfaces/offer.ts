export interface Offer {
    offerId: string;
    publishDate: Date;
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
