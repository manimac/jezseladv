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
    this.http.get('product/find/' + productId).subscribe(
      (response: any) => {
        this.productData = response;
        
      }, (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
