export interface FilterModel {
    carsBrands: string[];
    brandsModels: string[];
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
    seats: number[];
}
