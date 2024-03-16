export interface Offer {
    offerId: string;
    sellerUsername: string;
    unixPublishDate: number;
    offerDescription: string;
    images: string[];
    car: {
        [key: string]: string | number;
        carBrand: string;
        brandModel: string;
        fullCarName: string;
        productionYear: number;
        price: number;
        seats: string;
        gearboxType: string;
        fuelType: string;
        engineCapacity: number;
        mileage: number;
        horsePower: number;
    };
}
