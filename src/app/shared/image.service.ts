import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgDetailList;

  constructor(private firebase : AngularFireDatabase) { }

  getImageDetailList(){
    this.imgDetailList =  this.firebase.list('imageDetails')
  }

  insertImageDetails(imageDetails){
    this.imgDetailList.push(imageDetails)
  }


}
