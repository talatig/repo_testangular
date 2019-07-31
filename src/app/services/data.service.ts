import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _products_url = '/assets/data/http/products.json';
  private _amazon_report_url = '/assets/data/http/amazonreport.json';

  private data = {};  
  uri = 'http://localhost:4000';  
  // private storageName: string = "Settings";
  
  // setOption(option, value) {      
  //   this.data[option] = value;  
  // } 

  setOption(data) {      
    // localStorage.setItem(this.storageName, JSON.stringify(data));   
    this.data = data;  
    console.log(this.data);
  } 
  
  getOption() {
    // if(this.data) {
    //   this.data = Object.keys(this.data).length!=0 ? this.data : JSON.parse(localStorage.getItem(this.storageName));   
    // } 
    // else {
    //   this.data = {};
    // }
    // this.getObdata().subscribe(response => {
    //   this.data=response[0];
    // }); 

    return this.data;  
  }

  constructor(public http: HttpClient) { }

  getProducts(): Observable<IProducts> {
    return this.http.get<IProducts>(this._products_url);
  }

  getAmazonReport(): Observable<IAmazonReport> {
    return this.http.get<IAmazonReport>(this._amazon_report_url);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  addObdata(productList, productListExist, selectedStoreIndex, selectedStoreName, showCredentialScreen, storeDisplay, storeName, storePass) {
    const issue = {
      productList: productList,
      productListExist: productListExist,
      selectedStoreIndex: selectedStoreIndex,
      selectedStoreName: selectedStoreName,
      showCredentialScreen: showCredentialScreen,
      storeDisplay: storeDisplay,
      storeName: storeName,
      storePass: storePass
    };
    return this.http.post(`${this.uri}/obdatas/add`, issue);
  }  

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getObdata() {
    return this.http.get(`${this.uri}/obdatas`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  updateObdata(id, productList, productListExist, selectedStoreIndex, selectedStoreName, showCredentialScreen, storeDisplay, storeName, storePass) {
    const issue = {
      productList: productList,
      productListExist: productListExist,
      selectedStoreIndex: selectedStoreIndex,
      selectedStoreName: selectedStoreName,
      showCredentialScreen: showCredentialScreen,
      storeDisplay: storeDisplay,
      storeName: storeName,
      storePass: storePass
    };
    return this.http.post(`${this.uri}/obdatas/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  } 


}

interface IProducts {
  name: string;
  age: number;
  data: any;
  stores: any;
}

interface IAmazonReport {
  ListInventorySupplyResponse: any;
}
