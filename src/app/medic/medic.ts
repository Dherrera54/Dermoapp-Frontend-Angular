export class Medic {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  country: string;

  specialty: string;
  profesionalId: string;
  profilePicture: string;

  constructor(
    id: string,
    email: string,
    password: string,
    name: string,
    lastName: string,
    country: string,
    specialty: string,
    profesionalId: string,
    profilePicture: string,

  ){
      this.id = id;
      this.email=email;
      this.password=password;
      this.name = name;
      this.lastName= lastName;
      this.country=country;
      this.specialty =specialty;
      this.profesionalId=profesionalId;
      this.profilePicture= profilePicture;


  }
}
