import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@app/service';
import { BookModel } from '@app/models';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToolbarComponent } from '@app/toolbar.component';
import { DialogComponentComponent } from '@app/dialog-component/dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ToolbarComponent],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit, OnDestroy{
  id: number = 0;
  book: BookModel = {
    id: 0,
    title: "",
    author: "",
    isbn: "",
    pagesNum: 0,
  };
  dialogTitle: string = 'Book Update Confirmation';
  dialogContent: string = 'Are you sure to update this book ?';

  updateBookForm = new FormGroup({
    title : new FormControl(this.book.title, [Validators.required]),
    author : new FormControl(this.book.author, [Validators.required]),
    isbn : new FormControl(this.book.isbn, [Validators.required, forbiddenPagesNumValidator(/\D+/i)]),
    pagesNum : new FormControl(this.book.pagesNum, [Validators.required, forbiddenPagesNumValidator(/\D+/i)])
  });

  // matcher = new MyErrorStateMatcher();

  get title(){
    return this.updateBookForm.get('title');
  }

  get author(){
    return this.updateBookForm.get('author');
  }

  get isbn(){
    return this.updateBookForm.get('isbn');
  }

  get pagesNum(){
    return this.updateBookForm.get('pagesNum');
  }
  private sub: any;
  constructor(private _route: ActivatedRoute, 
    public bookService: BookService, 
    private _router: Router,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.id = +params['id'];
      // console.log(this.id);
      this.book.id = this.id;
      this.bookService.getBookById(this.id)
        .subscribe(bookRet => {
          this.book = bookRet;
          this.updateBookForm = new FormGroup({
            title : new FormControl(this.book.title, [Validators.required]),
            author : new FormControl(this.book.author, [Validators.required]),
            isbn : new FormControl(this.book.isbn, [Validators.required, forbiddenPagesNumValidator(/\D+/i)]),
            pagesNum : new FormControl(this.book.pagesNum, [Validators.required, forbiddenPagesNumValidator(/\D+/i)])
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSubmit(){
    var titleForm = this.updateBookForm.value.title !== undefined && this.updateBookForm.value.title !== null ? this.updateBookForm.value.title : '';
    var authorForm = this.updateBookForm.value.author !== undefined && this.updateBookForm.value.author !== null ? this.updateBookForm.value.author : '';
    var isbnForm = this.updateBookForm.value.isbn !== undefined && this.updateBookForm.value.isbn !== null ? this.updateBookForm.value.isbn : '';
    var pagesNumForm = this.updateBookForm.value.pagesNum !== undefined && this.updateBookForm.value.pagesNum !== null ? this.updateBookForm.value.pagesNum : 0;
    var b = new BookModel(titleForm, authorForm, isbnForm, pagesNumForm, this.id);
    // console.log(b);
    this.bookService.updateBook(this.id, b)
      .subscribe(() => {
        // this.router.navigate(['/home']);
        this._router.navigateByUrl('/home', {state: {messages: ['Book Successfully updated !']}});
      });
      // this.router.navigate(['/home'], {state: {messages: ['Successfully updated !']}});
  }

  openDialog(dialogType?: string, dialogTitle?: string, dialogContent?: string): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: {title: dialogTitle || this.dialogTitle, content: dialogContent || this.dialogContent, type: dialogType},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`The dialog was closed ${result}`);
      if (result !== undefined) {
        // Yes Clicked
        this.onSubmit();
      } else {
        // No Clicked
      }
    });
  }
};

/** A hero's name can't match the given regular expression */
export function forbiddenPagesNumValidator(pagesNumRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = pagesNumRe.test(control.value);
    // console.log(forbidden);
    return forbidden ? { forbiddenPagesNum: { value: control.value } } : null;
  };
};
