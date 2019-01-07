import { HttpHeaders } from "@angular/common/http";

export class requestConstants {
  public postHttpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public ACCESS_TOKEN_CONSTANT                            = "access_token"
  public REL_CONSTANTS                                     = "rel"
  
  // model constants start
  public ROLE_MAPPING_PLURAL_MODEL_CONSTANT               = "roleMappings"
  public ROLE_PLURAL_MODEL_CONSTANT                       = "roles"
  public CREDENTIAL_PLURAL_MODEL_CONSTANT                 = "credentials"
  // model constants end

  // Constant symbols start
  public QUESTION_SYMBOL_CONSTANT                         = "?"
  public FORWARD_SLASH_SYMBOL_CONSTANT                    = "/" 
  public EQUAL_SYMBOL                                     = "=" 
  // Constant symbols end

}