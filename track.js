'use strict';

class Track {
  
    constructor(){
        this.sessions=[];      
    }

    addSession(session){
        this.sessions.push(session)

    }
    getSessions(){
      return this.sessions;
    }
}



module.exports=Track;

