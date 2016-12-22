'use strict';
class Session{
    
    
    constructor(){
      this.talks=new Array();
    }

     addTalk(talk){
        talk.start_time=(this.minute_time/60);
        var duration=talk.getDuration();
         this.minute_time=this.minute_time+duration;
         this.current_time=(this.minute_time/60)
        this.talks.push(talk);
     }
    getTalks(){
        return this.talks;
     }
    
    getStartTime(){
        return this.startTime;
    }
    
    getEndTime(){
        return this.endTime;
    }
    
    getCurrentTime(){
      return this.current_time;
    }
    
     setStartTime(time){
        this.startTime=time;
        this.current_time=time;
        this.minute_time=time*60;
    }
    
    setEndTime(time){
        this.endTime=time;
    }
 
    
    
}
module.exports=Session;
