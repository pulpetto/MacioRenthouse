export interface FilterModel {
    carBrands: string[];
    carModels: string[];
    fuelTypes: string[];
    gearboxTypes: string[];
    priceFrom: number;
    priceTo: number;
    horsePowerFrom: number;
    horsePowerTo: number;
    engineSizeFrom: number;
    engineSizeTo: number;
    productionYearFrom: number;
    productionYearTo: number;
    mileageFrom: number;
    mileageTo: number;
    seatsAmount: number[];
}
