export class BookModel {
    constructor(public title: string,
        public author: string,
        public isbn: string,
        public pagesNum: number,
        public id?: number){}
    // public id: number;
    // public title: string;
    // public author: string;
    // public isbn: string;
    // public pagesNum: number;
}