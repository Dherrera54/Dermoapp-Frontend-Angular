export class Medic {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  country: string;
  address: string;
  specialty: string;
  profesionalId: string;
  lat: string;
  lon: string;


  constructor(
    id: number,
    email: string,
    password: string,
    name: string,
    lastName: string,
    country: string,
    address: string,
    specialty: string,
    profesionalId: string,
    lat: string,
    lon: string,
  ){
      this.id = id;
      this.email=email;
      this.password=password;
      this.name = name;
      this.lastName= lastName;
      this.country=country;
      this.address=address;
      this.specialty =specialty;
      this.profesionalId=profesionalId;
      this.lat=lat;
      this.lon=lon;

  }
}
