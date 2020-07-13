import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {}

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBI4BP-yV60cEaumbTMiz-UND_ZPqJPJsVEpuxUCn0aTKz4zRydecKCXcP33Pr-tEvR0bYAnbsFpCKsNgg'

    });

    return this.http.get(url,{headers});
  }

  getNewRelease(){
   
    return this.getQuery('browse/new-releases')
      .pipe( map( data => {
        return data['albums'].items;
      }));
  }
  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&market=US&limit=15`)
      .pipe(map(data => {
        return data['artists'].items;
      }));

  }
  getArtista(id: string){
    return this.getQuery(`artists/${ id }`);
      // .pipe(map(data => {
      //   return data['artists'].items;
      // }));
  }
  getTopTracks(id: string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
     .pipe(map(data => {
        return data['tracks'];
      }));
     
  }
}
