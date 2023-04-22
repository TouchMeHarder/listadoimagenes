import { Component, OnInit } from '@angular/core';
import { ImagesService } from './services/images.service';
import { take } from 'rxjs';
import { Images } from 'src/app/core/models/images.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imageList: Array<any> = [];

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.imageService.getImages().pipe(take(1)).subscribe({
      next: (response: Array<Images>) => {
        if (response)
        {
          this.imageList = [...response];
        }
      },
      error: () => {},
      complete: () => {}
    })
  }

}
