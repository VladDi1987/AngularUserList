import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { IAgeParam } from '../models/models';

@Pipe({
    name: 'ageFilter'
})

export class SearchByAgePipe implements PipeTransform {
    transform(users: Array<User>, ageParam: IAgeParam): Array<User> {
        if (!users) return [];
        if (!ageParam) return users;


        return users.filter(user => {
            return (user.age >= ageParam.minVal && user.age <= ageParam.maxVal);
        });

    }
}