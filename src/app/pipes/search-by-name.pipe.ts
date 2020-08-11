import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
    name: 'nameFilter'
})

export class SearchByNamePipe implements PipeTransform {
    transform(users: Array<User>, value: string): Array<User> {

        if (!users) return [];
        if (!value) return users;
        value = value.toLowerCase();
        return users.filter(user => {
            return user.firstName.toLowerCase().includes(value);
        });
    }
}