import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../services/http-request/http-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  productLists: any = [];
  currentProduct: any = {};
  showLoader: boolean = false;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    Naam: new FormControl('', Validators.required),
    Adres: new FormControl('', Validators.required),
    Postcode: new FormControl('', Validators.required),
    Plaats: new FormControl('', Validators.required),
    Land: new FormControl('', Validators.required),
    Telefoon: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Handelsnaam: new FormControl('', Validators.required),
    BedrijfsgegevensAdres: new FormControl('', Validators.required),
    BedrijfsgegevensPostcode: new FormControl('', Validators.required),
    BedrijfsgegevensPlaats: new FormControl('', Validators.required),
    BedrijfsgegevensLand: new FormControl('', Validators.required),
    Rechtsvorm: new FormControl('', Validators.required),
    KvKnummer: new FormControl('', Validators.required),
    KvKnummerFile: new FormControl('', Validators.required),
    NIWOvergunning: new FormControl(''),
    NIWOvergunningFile: new FormControl(''),
    BTWnummer: new FormControl('', Validators.required),
    Bankrekening: new FormControl('', Validators.required),
    loondienst: new FormControl(''),
    paychecked: new FormControl(''),
    IsMaandag: new FormControl(''),
    MaandagStartTime: new FormControl(''),
    MaandagEndTime: new FormControl(''),
    IsDinsdag: new FormControl(''),
    DinsdagStartTime: new FormControl(''),
    DinsdagEndTime: new FormControl(''),
    IsWoensdag: new FormControl(''),
    WoensdagStartTime: new FormControl(''),
    WoensdagEndTime: new FormControl(''),
    IsDonderdag: new FormControl(''),
    DonderdagStartTime: new FormControl(''),
    DonderdagEndTime: new FormControl(''),
    IsVrijdag: new FormControl(''),
    VrijdagStartTime: new FormControl(''),
    VrijdagEndTime: new FormControl(''),
    IsZaterdag: new FormControl(''),
    ZaterdagStartTime: new FormControl(''),
    ZaterdagEndTime: new FormControl(''),
    IsZondag: new FormControl(''),
    ZondagStartTime: new FormControl(''),
    ZondagEndTime: new FormControl(''),
    product_id: new FormControl('')
  })
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

  get formControls(){
    return this.formGroup.controls;
  }

  disabledForm(){
    let result = false;

    if(this.formGroup.invalid){
      result = true;
    }
    else if((this.currentProduct.niwo) && (!this.formGroup.value.NIWOvergunning)){
      result = true;
    }
    else if((this.currentProduct.niwo) && (this.formGroup.value.NIWOvergunning == 'Ja') && (!this.formGroup.value.NIWOvergunningFile)){
      result = true;
    }
    else if((this.currentProduct.loondienst) && (!this.formGroup.value.loondienst)){
      result = true;
    }
    else if((this.currentProduct.paychecked) && (!this.formGroup.value.paychecked)){
      result = true;
    }
    return result;
  }

  selectProduct(){
    this.currentProduct = this.productLists.find((element: any)=>(element.id==this.formGroup.value.product_id));
  }

  getProducts(id: any) {
    this.showLoader = true;
    this.http.get('products').subscribe(
      (response: any) => {
        this.productLists = response;
        this.currentProduct = this.productLists.find((element: any)=>(element.id==id));
        let obj = {product_id: id};
        this.formGroup.patchValue(obj);
        this.showLoader = false;
      }, (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  save(){
    let _form = new FormData();
    let keys = Object.keys(this.formGroup.value);
    for(let i = 0;i < keys.length;i++){
      if(this.formGroup.value[keys[i]] == null){
        this.formGroup.value[keys[i]] = '';
      }
      _form.append(keys[i], this.formGroup.value[keys[i]]);
    }
    this.showLoader = true;
    this.http.post('register/create', _form).subscribe(
      (response: any)=>{
        this.showLoader = false;
        this.http.successMessage('Thank you for registering');
        this.formGroup.reset();
      },
      (error: any)=>{
        this.http.exceptionHandling(error);
      }
    )
  }

  onKvKnummerFileChange(file: any) {
    this.formGroup.patchValue({
      KvKnummerFile: file[0]
    });
  }

  onNIWOvergunningFileChange(file: any) {
    this.formGroup.patchValue({
      NIWOvergunningFile: file[0]
    });
  }

}
