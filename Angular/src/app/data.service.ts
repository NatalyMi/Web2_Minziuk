import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {

 constructor(private http:HttpClient){

 }
 getProducts(){
 return this.http.get('http://localhost:8080/getproducts');
 }
 removeProduct(item:any){
 let obj={id:item._id}
 return this.http.post('/removeproduct',obj,{responseType:'text'})
 }
 addProduct(item:any){
 return this.http.post('http://localhost:8080/addproduct',item,{responseType:'text'});
 }

}