export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
  };
}
