import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
      public clientService:ClientService,
      public flashMessagesService: FlashMessagesService,
      public router:Router,
      public route: ActivatedRoute,
    ) { }

  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];
  
    //Get Client
    this.clientService.getClient(this.id).snapshotChanges().pipe(map(
      action => ({$key : action.key, ...action.payload.val()})
    )).subscribe(client => {
      if(client.balance > 0){
        this.hasBalance = true;
      }  
      this.client = client;
      console.log(this.client);
    });   
  
  }

  updateBalance(id:string,balance:number) {
    this.clientService.updateBalance(id, balance);
    this.flashMessagesService.show('Balance updated', { cssClass: 'alert-success', timeout: 2000 });
    this.router.navigate(['/client/' + id]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client deleted', { cssClass: 'alert-success', timeout: 2000 });
      this.router.navigate(['/']);
    }
  }

}
