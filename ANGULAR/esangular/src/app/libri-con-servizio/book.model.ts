export class Book {
    public id: number;
    public author: string;
    public country: string;
    public pages: number;
    public title: string;
    public year: number;

    constructor(id: number, author: string, country: string, pages: number, title: string, year: number) {
        this.id = id;
        this.author = author;
        this.country = country;
        this.pages = pages;
        this.title = title;
        this.year = year;
    }
}