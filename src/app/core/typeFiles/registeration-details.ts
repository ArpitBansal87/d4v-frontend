export class RegisterationDetails {
    constructor(
        public username: string,
        public password: string,
        public bloodType: string,
        public email: string,      
        public role: string
      ) { this.role = 'Member'; }
}
