import { CredentialsService } from './../../core/dataServices/credentials.service';
import { AuthService } from './../../core/auth.service';
import { CommonDataService } from './../../core/dataServices/common-data.service';
import { RolesFormat } from './../../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../../core/typeFiles/user-details';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnChanges {

  @Input()
  public userElement: UserDetails;
  @Input()
  public roleList: RolesFormat[];

  public roleValue: RolesFormat[];

  constructor(private commonDataObj: CommonDataService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['userElement'] != 'undefined') {
      let change = changes['userElement'];
      if (change.isFirstChange()) {
        this.roleValue = change.currentValue.roles;
      }
    }
   }

  isRoleSelected(idValue: string, source: string) {
    if (source == 'checked') {
      return ((this.userElement.roles.some((element) => {
          return (element.id == idValue);
        })) == true ? true : null);
    } else {
      return ((this.userElement.roles.some((element) => {
        return (element.id == idValue);
      })) == true ? null : true);
    }
  }

  checkboxChangeEvent(e: any) {
    let obj = e.source;
    if (e.checked) {
      this.commonDataObj.setRoleList(obj.value);
    } else {
      this.commonDataObj.removeRoleMapping(obj.value);
    }
  }

  isUserAdmin() {
    return this.commonDataObj.isUserAdmin();
  }
}
