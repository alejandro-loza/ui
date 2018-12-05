export interface Category {
    id: string;
    color: string;
    name: string;
    textColor: string;
    parent?: {
        id: string;
    };
}
