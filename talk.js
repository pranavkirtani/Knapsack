'use strict'
class Talk{

    
    
  constructor(topic,time){
    this.talkTopic=topic;
    this.duration=time;
    this.isDone=false;
    
  }
  getIsDone(){
    return this.isDone;
  }
    
    setIsDone(value){
     this.isDone=value;
  }
    
  getDuration(){
     return this.duration;
  }
    getTopic(){
     return this.talkTopic;
  }
    

}
module.exports=Talk;