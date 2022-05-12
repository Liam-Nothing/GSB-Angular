import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

public get phpSessionId() {
  return localStorage.getItem('phpSessionId') || "";
}

public set phpSessionId(value: string) {
  localStorage.setItem('phpSessionId', value)
}
//public phpSessionId:string = "";
  constructor(
    private httpClient : HttpClient
  ) { }

  login(username: string, password: string) {
    return this.httpClient.post(environment.apiUrl, {api: 'all_open_session', username:username, password:password}).pipe(map((data: any)=>{
      // On sauvegarde ici le token pour qu'il soit accessible dans tous les composants qui utilise AuthServiceService
      if(data && data.id == "1") {
        this.phpSessionId = data.php_session_id;
        console.log(this.phpSessionId);
        }
      return data
    }))
  }
}
