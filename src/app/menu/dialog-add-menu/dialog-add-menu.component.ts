import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Menu } from '../menu-model';
import { MenuservService } from '../menuserv.service';

@Component({
  selector: 'app-dialog-add-menu',
  templateUrl: './dialog-add-menu.component.html',
  styleUrls: ['./dialog-add-menu.component.css']
})
export class DialogAddMenuComponent implements OnInit {
 
    formPost = new FormGroup({
    name: new FormControl(null, { validators: [Validators.required] }),
    price: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null, { validators: [Validators.required] }),
    info: new FormControl(null, { validators: [Validators.required] })
    });
  menu: Menu;
  subs: Subscription;
  updateMode: boolean = false;
  file;


  constructor(private menuServ: MenuservService) {
    this.subs = this.menuServ.getMenuToUpdate().subscribe(menu => this.menu = menu);
   }

  ngOnInit(): void {
    this.updateMode = this.menuServ.updateMode;
    if (this.updateMode == false) {
      this.formPost = new FormGroup({
        name: new FormControl(null, { validators: [Validators.required] }),
        price: new FormControl(null, { validators: [Validators.required] }),
        image: new FormControl(null, { validators: [Validators.required] }),
        info: new FormControl(null, { validators: [Validators.required] })
        });
    } else {
      this.formPost = new FormGroup({
        name: new FormControl(this.menu.name),
        price: new FormControl(this.menu.price),
        image: new FormControl(this.menu.image),
        info: new FormControl(this.menu.info)
        });
    }
  }

  onSave() {
    if (!this.formPost.valid) {
      this.formPost.reset();
    }
    console.log(this.formPost.value);

    if (this.updateMode) {
      const newUpdatedMenu = {
        _id: this.menu._id,
        name: this.formPost.get('name').value,
        price: this.formPost.get('price').value,
        image:  this.formPost.get('image').value,
        info: this.formPost.get('info').value
      };
      console.log(newUpdatedMenu);
      this.menuServ.updateItem(newUpdatedMenu).subscribe(()=>{ console.log("Updated")});
    }

    else {
      const newMenu = {
        _id: null,
        name : this.formPost.get('name').value,
        price : this.formPost.get('price').value,
        image:  this.formPost.get('image').value,
        info : this.formPost.get('info').value
      }
      this.menuServ.postMenu(newMenu).subscribe(() => {
        console.log(newMenu);
      });
      this.formPost.reset();
    } 
    window.location.reload();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
