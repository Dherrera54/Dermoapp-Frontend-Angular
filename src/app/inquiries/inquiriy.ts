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
  specialty?:String
  diagnosis?: String;
  asigned?:Boolean;
  acceptDiagnosis?:Boolean;
  owned?:Boolean=false;

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
    image:String,
    diagnosis:String


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
      this.diagnosis=diagnosis;



  }
}
