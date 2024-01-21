export interface FilterModel {
    multiOptionsFilters: {
        carBrands: string[];
        carModels: string[];
        fuelTypes: string[];
        gearboxTypes: string[];
        seatsAmount: string[];
    };
    rangeFilters: {
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
    };
}
