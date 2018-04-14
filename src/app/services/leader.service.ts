import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, private http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('LEADERS').getList(); 
  }
  
  
  getFeaturedLeader(): Observable<Leader> {
      return this.restangular.all('LEADERS').getList({featured: true})
      .map(LEADERS => LEADERS[0]);
    }

  getLeaderIds(): Observable<number[] | any>{
    return this.getLeaders()
    .map(LEADERS => { return LEADERS.map(LEADER => LEADER.id) })
    .catch(error => { return error;});
  }
}
