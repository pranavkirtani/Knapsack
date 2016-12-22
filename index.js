'use strict';
var config=require('./config');
var ConfManagement=require('./conf_management');
var Organizer=require('./organizer');
var Session=require('./session');
var Track=require('./track');
var Talk=require('./talk');
var fs=require('fs');
class Main{
    
    constructor(){
        this.talks=[];
    }
    
    pushTalk(talk){
        this.talks.push(talk);
    }
    runManager(){
        var talks=this.talks;
        var conf_man=new ConfManagement();
        this.schedule(talks,conf_man);
        var tracks=conf_man.getTracks();
        var sessions=[]
        for(let i=0;i<tracks.length;i++){
            console.log("Track"+(i+1))
            var sessions=tracks[i].getSessions();
                for(let j=0;j<sessions.length;j++){
                            if(j%2==0){
                                console.log("morning session");
                        }
                    else{
                        console.log("afternoon session");
                    }
                    var scheduled_talks=sessions[j].getTalks();
                    for(let k=0;k<scheduled_talks.length;k++){
                         console.log("Time:"+dateConverter(scheduled_talks[k].start_time.toFixed(2)),scheduled_talks[k].talkTopic,"duration "+scheduled_talks[k].duration+" mins");
                        console.log("  ")
                    }

                }
        }


    }
    
    readFile(inputPath){
      var file=fs.readFileSync(inputPath,'utf-8')
      return file;
    }
    
    processData(file){//reading data from a file and creating talk objects out of the data
          var lines=file.split('\n')
          var numberPattern = /\d+/g;
        for(let i=0;i<lines.length;i++){
          var words=lines[i].split(' ');
          for(let j=0;j<words.length;j++){
            if(words[j].match(numberPattern)){

                var talk= new Talk(lines[i].replace(words[j],''),parseInt(words[j].match(numberPattern)));
                this.pushTalk(talk)
            }
              else if(words[j].indexOf('lightning')>-1){
                  var talk= new Talk(lines[i].replace(words[j],''),5);
                  this.pushTalk(talk)
              }
          }    
        
        }
    
    }
    
    //code keeps on creating tracks if any talks are left
     schedule(talks,conf_man){
         while(talks.length>0){
             var track=new Track();
             var talks=this.organizeSessions(talks,track);
             conf_man.addTrack(track);
         }
    }
    //writing code for creating morning and afternoon sessions
    organizeSessions(talks,track_instance){
          //writing code for the mornign session
           var morning_session=new Session();
           morning_session.setStartTime(config.morningStart);
           morning_session.setEndTime(config.morningEnd);
           var remaining_talks=this.scheduleTalk(talks,morning_session);
           track_instance.addSession(morning_session)
           //afternoon session
            if(remaining_talks.length>0){
               var afternoon_session=new Session();
               afternoon_session.setStartTime(config.afternoonStart);
               afternoon_session.setEndTime(config.networkMax);
               var remaining_talks=this.scheduleTalk(remaining_talks,afternoon_session);
               track_instance.addSession(afternoon_session)
               var network_talk=new Talk(config.networkEvent.talkTopic,config.networkEvent.duration)
                var current_time=afternoon_session.getCurrentTime();
                if(current_time>=config.networkMin){
                   afternoon_session.addTalk(network_talk);
                }
                else{
                  afternoon_session.setStartTime(config.networkMin);
                    afternoon_session.addTalk(network_talk);
                }
                network_talk.setIsDone(true);
            }
            return remaining_talks;


        }
    
    //code for organising the talk based on time available for the session
    scheduleTalk(talks,session_instance){
        var organizer= new Organizer();
        var new_talks=organizer.organize(talks,session_instance.getEndTime() - session_instance.getStartTime());
        var newer_talks=[]
        for(let i=0;i<new_talks.length;i++){
            if(new_talks[i].isDone==false){
               newer_talks.push(new_talks[i])
            }
            else{
                session_instance.addTalk(new_talks[i])
            }
            
        }
        return newer_talks;  
    }
        
}





function dateConverter(input){
    var new_data=input*100;
    var last_digit=new_data%100;
    var first_digit=parseInt(new_data/100);
    last_digit=Math.round((last_digit/100)*60);
    if(last_digit<10){
        last_digit='0'+last_digit;
    }
    return first_digit+":"+last_digit;

}


var object= new Main();
var file_data=object.readFile("input.txt");//referencing the file to be read
object.processData(file_data)
object.runManager();

