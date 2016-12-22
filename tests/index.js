
var should = require('should'); 
var assert = require('assert');
var config=require('../config');
var Organizer=require('../organizer');
var Session=require('../session');
var Track=require('../track');
var Talk=require('../talk');
var Main=require('../index');
describe('Test For testing Conference manager', function() {

 
  describe('Test for creating a Talk Object', function() {
    it('talk object should be created', function(done) {
        var talk= new Talk("Writing Fast Tests Against Enterprise Rails",60)
        talk.getTopic().should.equal("Writing Fast Tests Against Enterprise Rails");
        talk.getDuration().should.equal(60);
        done();
           
      });
      
   
  });
    
    
    
     describe('Test for adding a Talk to a session ', function() {
    it('Should add the duration to the current time', function(done) {
        var talk= new Talk("Writing Fast Tests Against Enterprise Rails",60)
        var session=new Session();
        session.setStartTime(1);
        session.addTalk(talk);
        session.getCurrentTime().should.equal(2);
        done();
           
      });
      
   
  });
    
    describe('Test for adding a Session to a Track ', function() {
    it('The session along with the talks should get added', function(done) {
        var talk= new Talk("Writing Fast Tests Against Enterprise Rails",60)
        var session=new Session();
        session.setStartTime(1);
        session.addTalk(talk);
        var track=new Track();
        track.addSession(session);
        track.getSessions()[0].getCurrentTime().should.equal(2);
        done();
           
      });
         describe('Test to verify conference manager is allocating talks correctly', function() {
    it('Checking for allocation of the correct talk if session time is large', function(done) {
        var organizer= new Organizer();
        var array_tasks=[];
        array_tasks.push(new Talk("Writing Fast Tests Against Enterprise Rails",60));
        array_tasks.push(new Talk("Overdoing it in Python",30));
        var organized_talks=organizer.organize(array_tasks,1);
        organized_talks[0].isDone.should.equal(true)
        organized_talks[1].isDone.should.equal(false)
        done();
           
      });
             
             
      it('Checking for allocation of the correct talk is session time is small', function(done) {
        var organizer= new Organizer();
        var array_tasks=[];
        array_tasks.push(new Talk("Writing Fast Tests Against Enterprise Rails",60));
        array_tasks.push(new Talk("Overdoing it in Python",30));
        var organized_talks=organizer.organize(array_tasks,0.5);
        organized_talks[0].isDone.should.equal(false)
        organized_talks[1].isDone.should.equal(true)
        done();
           
      });
      
   
  });
    
});
      
});

    
    
  