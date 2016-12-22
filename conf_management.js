'use strict';
var Track=require('./track');
class ConfTrackManagement{
constructor(){
  this.tracks=[]
}
 addTrack(track){
  this.tracks.push(track);
 }

    getTracks(){
      return this.tracks;
    }
    
}

module.exports=ConfTrackManagement;


