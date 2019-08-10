import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: AngularFireList<any>;
  client: AngularFireObject<any>;
 
  constructor(public af:AngularFireDatabase) { 
    this.clients = this.af.list('/clients') as AngularFireList<Client[]>;  
  }

  getClients(){
    return this.clients;
  }
  getClient(id:string) {
    this.client = this.af.object('/clients/'+id) as AngularFireObject<Client>;
    return this.client;
  }

  newClient(client: Client){
    //console.log(this.clients);
    this.clients.push(client);
  }
  updateBalance(id: string, balance: number) {
    return this.clients.update(id,{balance});   
  }
  updateClient(client: Client) {
    return this.client.update(client);
  }

  deleteClient(id:string){
    return this.clients.remove(id);
  }

}