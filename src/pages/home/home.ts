import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { CategoriesPage } from '../categories/categories';
import { DatabaseProvider } from '../../providers/database/database';
import { ProfilePage } from '../profile/profile';
import { ProfileEditPage } from '../profile-edit/profile-edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public db:DatabaseProvider) {
    console.log(this.db.getPlace());
  }

  Register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  nextPage(){
    this.navCtrl.push(CategoriesPage);
  }

  profilePage(){
    this.navCtrl.push(ProfilePage);
  }

  profileEdit(){
    this.navCtrl.push(ProfileEditPage);
  }
}
