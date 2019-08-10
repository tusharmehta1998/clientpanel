import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router:Router,
        public afAuth:AngularFireAuth
    ){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.pipe(map(auth => {
            if(!auth){
                this.router.navigate(['/login']);
                return false;
            }else{
                return true;
            }
        }));
    }
}