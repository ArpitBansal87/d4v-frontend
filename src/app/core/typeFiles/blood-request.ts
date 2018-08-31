import { HospitalDetailsFormat } from "./hospital-details-format";
import { AttenderDetails } from "./attender-details";

export class BloodRequest {

    constructor(
        public bloodType: string,
        public unitsRequired: number,
        public purpose: string,
        public patientName: string,      
        public requiredBy: Date,      
        public hospitalDetails: HospitalDetailsFormat,
        public status: string,
        public attenderDetails: AttenderDetails,
        public isRequestVerified: boolean
        // public moderatorsInvolved
        
      ) {  }

}
