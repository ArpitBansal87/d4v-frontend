import { RolesFormat } from "./returnFormat/roles-format";

export class UserDetails {

    constructor(public bloodGroup: string,
        public contactNo: string,
        public role: string,
        public areaCode: string,
        public email: string,
        public firstName: string,
        public id: string,
        public lastName: string,
        public middleName: string,
        public roles: [RolesFormat],
        public roleValue: string){}
}
