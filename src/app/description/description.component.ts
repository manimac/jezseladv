import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../services/http-request/http-request.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  productData: any = {};
  about: any = {};
  showLoader: boolean = false;
  constructor(private http: HttpRequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      console.log(params.id);
      if(params.id){
        this.getProducts(params.id)
      }
      else{
        this.http.errorMessage("No product found")
      }
  })
    
  }

  getProducts(productId: any) {
    this.showLoader = true;
    this.http.get('product/find/' + productId).subscribe(
      (response: any) => {
        this.productData = response;
        this.showLoader = false;
        
      }, (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
