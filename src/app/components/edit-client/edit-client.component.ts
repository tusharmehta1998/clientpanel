import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { map } from 'rxjs/operators';
import { SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService:ClientService,
    public flashMessagesService: FlashMessagesService,
    public router:Router,
    public route: ActivatedRoute,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];

    //Get Client
    this.clientService.getClient(this.id).snapshotChanges().pipe(map(
      action => ({$key: action.key, ...action.payload.val()})
    )).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value:Client, valid: boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all the details', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['edit-client/'+this.id]);
    }else{
      //Update client
      this.clientService.updateClient(value);
      this.flashMessagesService.show('Client Updated!',{cssClass:'alert-success', timeout: 2000});
      this.router.navigate(['/client/'+this.id]);
    }
  }
}
