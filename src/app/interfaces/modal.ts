export interface Modal {
    name: string;
    visibility: boolean;
    message: string;
    iconSrc: string;
    oneOption: boolean;
    options?: string[];
}
