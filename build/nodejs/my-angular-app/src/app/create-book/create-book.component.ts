import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '@app/service';
import { BookModel } from '@app/models';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToolbarComponent } from '@app/toolbar.component';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ToolbarComponent],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})

export class CreateBookComponent implements OnInit{
  constructor(public bookService: BookService, private _router: Router){}

  ngOnInit(): void {
    
  }

  newBookForm = new FormGroup({
    title : new FormControl('', [Validators.required]),
    author : new FormControl('', [Validators.required]),
    isbn : new FormControl('', [Validators.required, forbiddenPagesNumValidator(/\D+/i)]),
    pagesNum : new FormControl('', [Validators.required, forbiddenPagesNumValidator(/\D+/i)])
  });

  // matcher = new MyErrorStateMatcher();

  get title(){
    return this.newBookForm.get('title');
  }

  get author(){
    return this.newBookForm.get('author');
  }

  get isbn(){
    return this.newBookForm.get('isbn');
  }

  get pagesNum(){
    return this.newBookForm.get('pagesNum');
  }

  onSubmit(){
    // console.warn(this.newBookForm.value);
    var titleForm = this.newBookForm.value.title !== undefined && this.newBookForm.value.title !== null ? this.newBookForm.value.title : '';
    var authorForm = this.newBookForm.value.author !== undefined && this.newBookForm.value.author !== null ? this.newBookForm.value.author : '';
    var isbnForm = this.newBookForm.value.isbn !== undefined && this.newBookForm.value.isbn !== null ? this.newBookForm.value.isbn : '';
    var pagesNumForm = this.newBookForm.value.pagesNum !== undefined && this.newBookForm.value.pagesNum !== null ? parseInt(this.newBookForm.value.pagesNum) : 0;
    var b = new BookModel(titleForm, authorForm, isbnForm, pagesNumForm);
    // console.log(b);
    this.bookService.addBook(b)
      .subscribe(book => {
        // console.log(`Added Book ${book}`);
        // this._router.navigate(['/home']);
        this._router.navigateByUrl('/home', {state: {messages: ['Book Successfully created !']}});
      });
  }
}

/** A hero's name can't match the given regular expression */
export function forbiddenPagesNumValidator(pagesNumRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = pagesNumRe.test(control.value);
    // console.log(forbidden);
    return forbidden ? { forbiddenPagesNum: { value: control.value } } : null;
  };
}
