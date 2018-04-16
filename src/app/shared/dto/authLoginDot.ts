export class User{
  constructor(
    public email: string,
    public password: string,
    public id?: string,
    public name?: string,
    public lastName?: string
  ){}
}
