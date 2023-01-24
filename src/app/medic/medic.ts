export class Medic {
  id: number;
  email: string;
  password: string;
  nombre: string;
  pais: string;
  direccion: string;
  especialidad: string;
  lat: string;
  lon: string;


  constructor(
    id: number,
    email: string,
    password: string,
    nombre: string,
    pais: string,
    direccion: string,
    especialidad: string,
    lat: string,
    lon: string,
  ){
      this.id = id;
      this.email=email;
      this.password=password;
      this.nombre = nombre;
      this.pais=pais;
      this.direccion=direccion;
      this.especialidad =especialidad;
      this.lat=lat;
      this.lon=lon;

  }
}
