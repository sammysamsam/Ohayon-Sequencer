import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import axios from "axios";

class StrandlistStore extends EventEmitter{
	constructor(){
		super()
		this.projectname = "Unnamed Project";
		this.strandlist = [];
		this.activedisplay1 = "1";
		this.results = "";
		this.conditions = {Salt:"Na", Concentration:1.0};
		this.sequencerstatus = false;  // false = can not use sequencer (because sequencer is running or strandlist size < 1, true = sequencer is ready to sequence)
	}


//  Getter Methods

	getConditions(){
		return this.conditions;
	}
	getName(){
		return this.projectname;
	}
	getAllStrands(){
		return this.strandlist;
	}
	getActiveDisplay1(){
		return this.activedisplay1;
	}
	getSequencerStatus(){
		return this.sequencerstatus;
	}
	getResults(){
		return this.results;
	}
//    MobX Methods

	addstrandlist(NewStrand){
		var checkpoint = false;
		for(var i = 0; i < this.strandlist.length;i++){
			if(this.strandlist[i].name == NewStrand.name){
				 checkpoint = true;
				 alert("Name Already Exists in Strand List");
			}
		}
		if(checkpoint == false){
			NewStrand.sequence = this.randomsequence(NewStrand.length);
			this.strandlist.push(NewStrand);
			this.emit("Change_Strandlist");
		}
	}	

	updateStrandlist(updatedlist){
		this.strandlist = updatedlist;
		this.emit("Change_Strandlist");
	}
	editSalt(NewConditions){
		this.conditions.Salt = NewConditions;
		this.emit("Change_Condition");
	}
	editSaltConcentration(NewConditions2){
		this.conditions.Concentration = NewConditions2;
		this.emit("Change_Condition");
	}
	editProjectName(NewName){
		this.projectname = NewName;
		this.emit("Change_Name");
	}

	editActiveDisplay1(Display1){
		this.activedisplay1 = Display1;
		this.emit("Change_ActiveDisplay1");
	}


	updateresults(results){
		this.results = results;
		this.emit("Update_Results");
	}

 //    Running Algorithm Methods

 	updatesequencestatus(status){
 		this.sequencerstatus = status;
 		this.emit("Sequencer_Status_Updater");
 	}
 	randomsequence(length){
 		var sequence = "";
 		for(var i = 0; i < length;i ++){
			var random = Math.ceil(Math.random() * 4);
			if(random == 1){	sequence = sequence + "A";}
			if(random == 2){ sequence = sequence + "T";}
			if(random == 3){ sequence = sequence + "C";}
			else{sequence = sequence + "G";}
 		}
 		return sequence; 
 	}

 	runsequence(){ // "strandname,15,true,5,5,o-o-o-o-o-o-o-o-o-o-o-o-o-o-o"
		this.sequencerstatus = true;
		this.emit("Update_Sequencer_Status");

 		var list = []
 		for(var i = 0; i < this.strandlist.length; i ++){
 			list.push( this.strandlist[i].name+","+String(this.strandlist[i].length)+","+String(this.strandlist[i].complement)+","+String(this.strandlist[i].mismatch)+","+String(this.strandlist[i].hairpin)+","+this.strandlist[i].blueprint)
 		}
 		var list2 = axios.post('/SequencingStage/SequenceStrandList', {
 						salt:this.conditions.Salt,
 						concentration: this.conditions.Concentration ,
 						strandlist:list
 					})
 					.then(function (response) {
 						return response.data.strandlist;
  					})
 			 		.catch(function (error) {
    					console.log(error);
  					});

 		for(var a = 0;a < list2.length;a++){
			for(var b = 0; b < this.strandlist.length; b++){
				if(list2[a].split(":")[0] == this.strandlist[b].name){
					this.strandlist[b].sequence = list2[a].split(":")[1];
						break;
				}
			}
		}


 		this.sequencerstatus = false;
		this.emit("Update_Sequencer_Status");
		this.emit("Change_Strandlist");
 	}


// Flux Methods
	handleActions(action){
		switch(action.type){
			case "SEQUENCE_STRANDLIST":{
				this.runsequence();
				break;
			}
			case "ADD_STRANDLIST" : {
				this.addstrandlist(action.StrandAdd);
				break;
			}
			case "UPDATE_STRANDLIST" : {
				this.updateStrandlist(action.StrandlistUpdate);
				break;
			}
			case "EDIT_PROJECTNAME" : {
				this.editProjectName(action.ProjectName);
				break;
			}
			case "EDIT_SALT" : {
				this.editSalt(action.Conditions1);
				break;
			}
			case "EDIT_SALT_CONCENTRATION" : {
				this.editSaltConcentration(action.Conditions2);
				break;
			}
			case "EDIT_ACTIVE_DISPLAY1": {
				this.editActiveDisplay1(action.Display1);
				break;
			}
			case "UPDATE_SEQUENCER_STATUS":{
				this.updatesequencestatus(action.status1);
				break;
			}
			case "UPDATE_RESULT":{
				this.updateresults(action.results);
				break;
			}
		}
	}
}


const strandlistStore = new StrandlistStore;
	
Dispatcher.register(strandlistStore.handleActions.bind(strandlistStore));

export default strandlistStore;



