import { Patient } from '../shared/models/patient';
export class Inquiry {
  id: string;
  creationDate: string;
  typeOfInjury: string;
  shape: string;
  injuryQuantity: string;
  numberOfInjuries:String;
  image:String;
  distribution: string;
  comment: string;
  patient: Patient;
  diagnostic?: String;

  constructor(
    id: string,
    creationDate: string,
    typeOfInjury: string,
    shape: string,
    injuryQuantity: string,
    distribution: string,
    comment: string,
    patient: Patient,
    numberOfInjuries:string,
    image:String


  ){
      this.id = id;
      this.patient=patient;
      this.creationDate=creationDate;
      this.typeOfInjury = typeOfInjury;
      this.shape= shape;
      this.injuryQuantity=injuryQuantity;
      this.distribution =distribution;
      this.comment=comment;
      this.numberOfInjuries=numberOfInjuries;
      this.image=image;



  }
}
