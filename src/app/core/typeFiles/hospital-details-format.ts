import { AddressFormat } from './address-format';

export class HospitalDetailsFormat {

    constructor(
        public hospitalName: string,
        public hospitalLocationDetails: AddressFormat

      ) {  }
}
