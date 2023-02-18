export class Patient {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  country: string;
  profilePicture: string;

  constructor(
    id: string,
    name: string,
    age: number,
    birthDate: string,
    country: string,
    profilePicture: string

   ){
      this.id = id;
      this.age=age;
      this.birthDate=birthDate;
      this.name = name;
      this.country=country;
      this.profilePicture=profilePicture;
  }
}
