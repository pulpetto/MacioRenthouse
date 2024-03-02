export interface CheckboxOption {
    name: string;
    status: 'checked' | 'available' | 'unavailable';
    id: string;
    count: number;
}
