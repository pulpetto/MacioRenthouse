export interface Offer {
    offerId: string;
    sellerUsername: string;
    unixPublishDate: number;
    price: number;
    offerDescription: string;
    images: string[];
    car: {
        carBrand: string;
        brandModel: string;
        fullCarName: string;
        productionYear: number;
        seats: number;
        gearboxType: string;
        fuelType: string;
        engineCapacity: number;
        mileage: number;
        horsePower: number;
    };
}
