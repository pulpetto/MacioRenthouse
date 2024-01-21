export interface FilteringOption {
    filter:
        | 'carBrands'
        | 'carModels'
        | 'fuelTypes'
        | 'gearboxTypes'
        | 'priceFrom'
        | 'priceTo'
        | 'horsePowerFrom'
        | 'horsePowerTo'
        | 'engineSizeFrom'
        | 'engineSizeTo'
        | 'productionYearFrom'
        | 'productionYearTo'
        | 'mileageFrom'
        | 'mileageTo'
        | 'seatsAmount';
}
