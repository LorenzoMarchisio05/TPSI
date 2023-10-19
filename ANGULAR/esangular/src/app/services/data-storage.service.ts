import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

// import in app-mdule (httpClientModule) 
// import here httpClient

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {  
  private REST_API_SERVER: string = "https://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  public Get(endpoint: string) {
    const url: string = this.REST_API_SERVER + endpoint;

    this.httpClient.get(url);
  }

  public Post(endpoint: string, body: any) {
    const url: string = this.REST_API_SERVER + endpoint;

    this.httpClient.post(url, body);
  }

  public Put(endpoint: string, body: any) {
    const url: string = this.REST_API_SERVER + endpoint;

    this.httpClient.put(url, body);
  }

  public Delete(endpoint: string) {
    const url: string = this.REST_API_SERVER + endpoint;

    this.httpClient.delete(url);
  }
}
