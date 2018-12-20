import { RolesFormat } from './../../core/typeFiles/returnFormat/roles-format';
import { UserDetails } from './../../core/typeFiles/user-details';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() 
  public userElement: UserDetails
  @Input()
  public roleList: RolesFormat[]

  constructor() { console.log("test ine ")}

  ngOnInit() {
  }

  isRoleSelected(idValue,source){
    if(source =='checked')
      return ((this.userElement.roles.some((element)=>{
          return (element.id == idValue)
        })) == true?true:null)
    else
      return ((this.userElement.roles.some((element)=>{
        return (element.id == idValue)
      })) == true?null:true)
  }
}
