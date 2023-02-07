export class Inquiry {
  id: string;
  patientId: string;
  creatioDate: string;
  injuryType: string;
  shape: string;
  injuryQuantity: string;

  distribution: string;
  location: string;

  constructor(
    id: string,
    patientId: string,
    creatioDate: string,
    injuryType: string,
    shape: string,
    injuryQuantity: string,
    distribution: string,
    location: string,


  ){
      this.id = id;
      this.patientId=patientId;
      this.creatioDate=creatioDate;
      this.injuryType = injuryType;
      this.shape= shape;
      this.injuryQuantity=injuryQuantity;
      this.distribution =distribution;
      this.location=location;



  }
}
