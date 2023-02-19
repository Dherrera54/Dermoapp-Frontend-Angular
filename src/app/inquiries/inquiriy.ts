import { Patient } from '../shared/models/patient';
export class Inquiry {
  id: string;
  creationDate: string;
  symptom: string;
  shape: string;
  injuryQuantity: string;
  numberOfInjuries:String;
  image:String;
  distribution: string;
  location: string;
  patient: Patient;

  constructor(
    id: string,
    creationDate: string,
    symptom: string,
    shape: string,
    injuryQuantity: string,
    distribution: string,
    location: string,
    patient: Patient,
    numberOfInjuries:string,
    image:String


  ){
      this.id = id;
      this.patient=patient;
      this.creationDate=creationDate;
      this.symptom = symptom;
      this.shape= shape;
      this.injuryQuantity=injuryQuantity;
      this.distribution =distribution;
      this.location=location;
      this.numberOfInjuries=numberOfInjuries;
      this.image=image;



  }
}
