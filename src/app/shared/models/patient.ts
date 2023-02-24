export class Patient {
  id: string;
  name: string;
  birthDate: string;
  country: string;
  profilePicture: string;

  constructor(
    id: string,
    name: string,
    birthDate: string,
    country: string,
    profilePicture: string

   ){
      this.id = id;
      this.birthDate=birthDate;
      this.name = name;
      this.country=country;
      this.profilePicture=profilePicture;
  }
}
