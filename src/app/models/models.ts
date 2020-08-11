import { User } from './user.model';

export interface IEdit {
    isEdit: boolean;
    user?: User;
}

export interface  IAgeParam {
    minVal: number;
    maxVal: number;
}

export interface IPagination {
    value: number;
    label: string;
}

export interface IControl {
    value: string;
    label: string;
}
