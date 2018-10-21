import { HttpHeaders } from "@angular/common/http";

export class requestConstants {
  public postHttpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}