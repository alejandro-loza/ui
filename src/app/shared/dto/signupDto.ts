export class SignupData {
  constructor(
    public email: string,
    public password: string,
    public passwordConfirm:string,
    public termsAndConditions: boolean,
    public blog: boolean
  ){}
}