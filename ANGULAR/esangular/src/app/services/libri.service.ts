import { Injectable } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Book } from '../libri-con-servizio/book.model';

@Injectable({
  providedIn: 'root'
})
export class LibriService {
  private static readonly endpoint = 'books/';

  constructor(
    private dataStorageService: DataStorageService,
  ) { }

  GetBooks(): Promise<Book[]> {
    return new Promise<Book[]>((resolve, reject) => {
      this.dataStorageService.Get(LibriService.endpoint)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            resolve(data);
          },
          error: (err: any) => {
            reject(err);
          }
        });
    });
  }

  GetBook(id: number): Promise<Book> { 
    return new Promise<Book>((resolve, reject) => {
      this.dataStorageService.Get(LibriService.endpoint + id)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            resolve(data);
          },
          error: (err: any) => {
            reject(err);
          }
        });
    });
  }

  AddBook(book: Book): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.dataStorageService.Post(LibriService.endpoint, book)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            resolve(book.id);
          },
          error: (err: any) => {
            reject(err);
          }
        });
    });
  }

  UpdateBook(book: Book): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.dataStorageService.Put(LibriService.endpoint + book.id, book)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            resolve(book.id);
          },
          error: (err: any) => {
            reject(err);
          }
        });
    });
  }

  DeleteBook(id: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.dataStorageService.Delete(LibriService.endpoint + id)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            resolve(id);
          },
          error: (err: any) => {
            reject(err);
          }
        });
    });
  }
}
