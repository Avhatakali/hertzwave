import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { NgForm } from "@angular/forms";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  register(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: `Registering ${form.value.email}...`
    });
    loading.present();

    this.db.registerUser(form.value.email, form.value.password).then(data => {
      let userID = firebase.auth().currentUser.uid;
      let registrationObj = {
        name: form.value.name,
        surname: form.value.surname,
        password: form.value.password,
        email: form.value.email,
        phone: form.value.phone
      };
      firebase.database().ref("Registration/" + userID).set(registrationObj);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: `${form.value.email} has successfully been registered!`,
        buttons: [{
          text: 'Okay',
          handler: ()=>{
            this.navCtrl.push('StartPage');//where we are navigating to
          }
        }]
      })
      alert.present();
    }).catch((error)=>{
      console.log(error);
      loading.dismiss();
      //check if the email already exists
      if(error.code == 'auth/email-already-in-use'){
        this.navCtrl.push('LoginPage');
      }
      const alert = this.alertCtrl.create({
        title: error.code,
        subTitle: error.message,
        buttons: [{
          text: 'Okay',
          handler: ()=>{
          }
        }]
      })
      alert.present();
    })
  }
}
