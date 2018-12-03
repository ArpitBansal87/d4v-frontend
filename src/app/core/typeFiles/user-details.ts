import { RolesFormat } from "./returnFormat/roles-format";

export interface UserDetails {

    bloodGroup: string,
    contactNo: string,
    role: string,
    areaCode: string,
    email: string,
    firstName: string,
    id: string,
    lastName: string,
    middleName: string,
    roles: [RolesFormat],
    roleValue: string[]
}
