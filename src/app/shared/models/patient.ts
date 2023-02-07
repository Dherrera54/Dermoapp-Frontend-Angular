export class patient {
  id: string;
  name: string;
  age: number;
  birthday: string;
  country: string;

  constructor(
    id: string,
    name: string,
    age: number,
    birthday: string,
    country: string,

   ){
      this.id = id;
      this.age=age;
      this.birthday=birthday;
      this.name = name;
      this.country=country;
  }
}
