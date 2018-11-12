import { BloodRequest } from './../typeFiles/blood-request';
import { BloodReqeustService } from './blood-reqeust.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _bloodRequestList: BehaviorSubject<[BloodRequest]> = new BehaviorSubject<any> ([]) ;
  bloodRequestList = this._bloodRequestList.asObservable();
  
  constructor(private dataService: BloodReqeustService) { }

  getBloodRequestData(){
    this.dataService.getBloodRequestList().subscribe( dataResponse => {
      this._bloodRequestList.next(dataResponse)
    })
  }
}
