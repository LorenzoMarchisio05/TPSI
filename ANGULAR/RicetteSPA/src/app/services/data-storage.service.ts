import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

// import in app-mdule (httpClientModule) 
// import here httpClient

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {  
  private REST_API_SERVER: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  public Get(endpoint: string) {
    const url: string = this.REST_API_SERVER + endpoint;

    return this.httpClient.get(url);
  }

  public Post(endpoint: string, body: any) {
    const url: string = this.REST_API_SERVER + endpoint;

    return this.httpClient.post(url, body);
  }

  public Put(endpoint: string, body: any) {
    const url: string = this.REST_API_SERVER + endpoint;

    return this.httpClient.put(url, body);
  }

  public Delete(endpoint: string) {
    const url: string = this.REST_API_SERVER + endpoint;

    return this.httpClient.delete(url);
  }
}
