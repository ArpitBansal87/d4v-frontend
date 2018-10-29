export class BloodRequest {

    constructor(
        public bloodType: string,
        public unitsRequired: number,
        public purpose: string,
        public patientName: string,      
        public requiredBy: Date,      
        public status: string,
        public isRequestVerified: boolean,
        public attenderName: string,
        public attenderPhone: number,
        public hospitalName: string,
        public hospitalAddressLine1: string,
        public hospitalAddressLine2: string,
        public hospitalAddressLine3: string,
        public hospitalCity:string,
        public hospitalState:string,
        public hospitalPincode: string,
        public createdByName:string,
        public createdById: string,
        public moderatorsInvolved: [string],
        public changeId: string,
        public id: string
      ) {  }
    
    createEmpty(){
        return this
    }
}
