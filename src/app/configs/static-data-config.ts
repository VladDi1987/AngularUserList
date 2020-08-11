import * as Models from '../models/models';

export class StaticDataConfig {

    static columns: Array<string> = ['#', 'First Name', 'Last Name', 'Age', 'Email', 'Actions'];

    static paginationOptions: Array<Models.IPagination> = [
        {value: 10, label: '10 items'},
        {value: 25, label: '25 items'},
        {value: 40, label: '40 items'},
    ];

    static control: Array<Models.IControl> = [
        {value: 'pagination', label: 'pagination'},
        {value: 'scroll', label: 'scroll'}
    ];

    static ageOptions: Array<Models.IAgeParam> = [
        {minVal: 1, maxVal: 100},
        {minVal: 1, maxVal: 10},
        {minVal: 10, maxVal: 20},
        {minVal: 20, maxVal: 30},
        {minVal: 30, maxVal: 40},
        {minVal: 40, maxVal: 99}
    ];

}
