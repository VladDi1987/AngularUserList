export class User {

    public firstName: string;
    public lastName: string;
    public email: string;
    public age: number;
    public selected?: boolean;
    public id?: number;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
