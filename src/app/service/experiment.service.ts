import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  private readonly baseUrl = environment.config.baseUrl;
  constructor(private readonly http: HttpClient) { }

  getExperiment(id: string) {
    return this.http.get(`${this.baseUrl}/experiment/${id}`).pipe(take(1));
  }

  getStudy(id: string) {
    return this.http.get(`${this.baseUrl}/study/${id}`).pipe(take(1));
  }

  getAssay(id: string) {
    return this.http.get(`${this.baseUrl}/assay/${id}`).pipe(take(1));
  }

  getSamples(id: string) {
    return this.http.get(`${this.baseUrl}/samples/${id}`).pipe(take(1));
  }

  getAssay2(id: string) {
    return this.http.get(`${this.baseUrl}/assay2/${id}`).pipe(take(1));
  }

  getSamples2(id: string) {
    return this.http.get(`${this.baseUrl}/samples2/${id}`).pipe(take(1));
  }

  serachByTerm(term: string) {
    return this.http.get(`${this.baseUrl}/search/${term}`).pipe(take(1));
  }


}
