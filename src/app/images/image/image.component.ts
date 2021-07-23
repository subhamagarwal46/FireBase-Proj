import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imgForm: FormGroup;
  imgSrc = '../../../assets/img/click_img.png';
  selectedImg = null;
  constructor(private fb: FormBuilder, private fireStorage: AngularFireStorage, private service: ImageService) { }

  ngOnInit(): void {
    this.imgForm = this.fb.group({
      caption: ['', Validators.required],
      category: ['bird'],
      imgUrl: ['', Validators.required]
    })
  }

  onSubmit(formValue) {
    if (this.imgForm.valid) {
      var filePath = `${formValue.category}/${this.selectedImg.name.split('.')[0]}_${new Date().getTime()}`
      const fileref = this.fireStorage.ref(filePath);
      this.fireStorage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileref.getDownloadURL().subscribe((url) => {
            formValue['imgUrl']=url;
            this.service.insertImageDetails(formValue)
            this.resetForm();
          })
        })
      ).subscribe();
    }

  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0])
      this.selectedImg = event.target.files[0]
    } else {
      this.imgSrc = '../../../assets/img/click_img.png';
      this.selectedImg = null;
    }
  }

  resetForm() {
    this.imgForm.reset();
    this.imgForm.setValue({
      caption: '',
      category: 'bird',
      imgUrl: ''
    })
    this.imgSrc = '../../../assets/img/click_img.png';
    this.selectedImg = null;
  }

}
