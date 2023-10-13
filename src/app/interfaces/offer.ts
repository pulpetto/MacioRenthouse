export interface Offer {
    offerId: string;
    publishDate: Date;
    price: number;
    pickupLocation: string;
    offerDescription: string;
    images: string[];
    car: {
        carBrand: string;
        brandModel: string;
        carProductionDate: number;
        seats: number;
        gearboxType: string;
        fuelType: string;
        engineCapacity: number;
        mileage: number;
        horsePower: number;
    };
}
