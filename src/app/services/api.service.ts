import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authURL: string = "http://localhost:4600/user";
  //authURL: string = "https://digitrix.herokuapp.com/user";

  constructor(private http: HttpClient) {
  }

  login(credentials) {
    return this.http.post(this.authURL + '/login', credentials)
  }
  signup(credentials){
    return this.http.post(this.authURL + '/signup', credentials)
  }
  addPost(formData){
    return this.http.post(this.authURL + '/addpost', formData)
  }
  getPost(){
    return this.http.get(this.authURL + '/addpost')
  }
  setData(data,key) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
  }

  getData(key) {
    return localStorage.getItem(key)
  }

  removeData(key) {
    localStorage.removeItem(key)
  }
}
