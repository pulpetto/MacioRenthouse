export interface Offer {
    offerId: string;
    sellerUsername: string;
    unixPublishDate: number;
    price: number;
    pickupLocation: string;
    offerDescription: string;
    images: string[];
    car: {
        carBrand: string;
        brandModel: string;
        productionYear: number;
        seats: number;
        gearboxType: string;
        fuelType: string;
        engineCapacity: number;
        mileage: number;
        horsePower: number;
    };
}
