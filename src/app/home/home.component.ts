import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../services/http-request/http-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productLists: any = [];
  about: any = {};
  showLoader: boolean = false;
  constructor(private http: HttpRequestService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.showLoader = true;
    this.http.get('aboutus').subscribe(
      (response: any) => {
        this.about = response;
        console.log(this.about)
      }, (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    this.http.get('products').subscribe(
      (response: any) => {
        this.showLoader = false;
        this.productLists = response;
        console.log(this.productLists)
        setTimeout(()=>{
          const liElement = document.getElementsByTagName("li");
          if(liElement){
            for(let i = 0;i< liElement.length;i++){
              liElement[i].innerHTML = "<i class='fa fa-angle-double-right' aria-hidden='true'></i><span>" + liElement[i].innerHTML + "</span>"
            }
          }
        })
        
      }, (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
