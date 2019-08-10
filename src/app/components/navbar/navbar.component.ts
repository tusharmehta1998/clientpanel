import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { Observable } from 'rxjs';
import { SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }

      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessageService.show('Logged out successfully!', {cssClass: 'alert-success', timeout: 2000});
    this.router.navigate(['/login']);
  }
}
