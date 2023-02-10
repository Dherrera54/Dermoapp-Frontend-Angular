import { Patient } from '../shared/models/patient';
export class Inquiry {
  id: string;
  creatioDate: string;
  injuryType: string;
  shape: string;
  injuryQuantity: string;

  distribution: string;
  location: string;
  patient: Patient;

  constructor(
    id: string,
    creatioDate: string,
    injuryType: string,
    shape: string,
    injuryQuantity: string,
    distribution: string,
    location: string,
    patient: Patient


  ){
      this.id = id;
      this.patient=patient;
      this.creatioDate=creatioDate;
      this.injuryType = injuryType;
      this.shape= shape;
      this.injuryQuantity=injuryQuantity;
      this.distribution =distribution;
      this.location=location;



  }
}
