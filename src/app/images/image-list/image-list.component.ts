import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imgList = [];
  rowIndexArray = [];
  constructor(private service: ImageService) { }

  ngOnInit(): void {
    this.service.imgDetailList.snapshotChanges().subscribe((list) => {
      this.imgList = list.map(item => { return item.payload.val() })
      this.rowIndexArray = Array.from(Array(Math.ceil((this.imgList.length+1) / 3)).keys())
    })
  }

}
