export interface FilterModel {
    multiOptionsFilters: {
        [key: number | string]: string[];
        carBrands: string[];
        carModels: string[];
        fuelTypes: string[];
        gearboxTypes: string[];
        seatsAmount: string[];
    };
    rangeFilters: {
        [key: string]:
            | {
                  [key: string]: number;
                  priceFrom: number;
                  priceTo: number;
              }
            | {
                  [key: string]: number;
                  horsePowerFrom: number;
                  horsePowerTo: number;
              }
            | {
                  [key: string]: number;
                  engineSizeFrom: number;
                  engineSizeTo: number;
              }
            | {
                  [key: string]: number;
                  productionYearFrom: number;
                  productionYearTo: number;
              }
            | {
                  [key: string]: number;
                  mileageFrom: number;
                  mileageTo: number;
              };
        price: {
            [key: string]: number;
            priceFrom: number;
            priceTo: number;
        };
        horsePower: {
            [key: string]: number;
            horsePowerFrom: number;
            horsePowerTo: number;
        };
        engineSize: {
            [key: string]: number;
            engineSizeFrom: number;
            engineSizeTo: number;
        };
        productionYear: {
            [key: string]: number;
            productionYearFrom: number;
            productionYearTo: number;
        };
        mileage: {
            [key: string]: number;
            mileageFrom: number;
            mileageTo: number;
        };
    };
}
