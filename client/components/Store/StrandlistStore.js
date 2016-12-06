import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import axios from "axios";

class StrandlistStore extends EventEmitter{
	constructor(){
		super();
		this.projectname = "Unnamed Project";
		this.component_strandlist = [];
		this.full_strandlist = [];
		this.conditions = {Salt:"Na", Concentration:1.0};
		this.workspaceDisplay = "1";
		this.dataAnalysis_Results = ["",""];
		this.toolsAnalysis_results = ["","",""];
		this.javaprogramstatus = false;  // false = can not use sequencer (because sequencer is running or strandlist size < 1, true = sequencer is ready to sequence)
		this.sequencertimeout = 30;
	}


//  Getter Methods

	getConditions()
	{
		return this.conditions;
	}
	getName()
	{
		return this.projectname;
	}
	getStrandComponents()
	{
		return this.component_strandlist;
	}
	getFullStrands()
	{
		return this.full_strandlist;
	}
	getWorkspaceDisplay()
	{
		return this.workspaceDisplay;
	}
	getJavaProgramStatus()
	{
		return this.javaprogramstatus;
	}
	getSequencerTimeout()
	{
		return this.sequencertimeout;
	}	
	getDataAnalysisResults()
	{
		return this.dataAnalysis_Results;
	}
	getToolsAnalysisResults()
	{
		console.log("tar" + this.toolsAnalysis_results);
		return this.toolsAnalysis_results;
	}

	updateSequencerTimeout(time)
	{
		if (time== parseInt(time, 10) && time > 5 && time < 181)
		{
			this.sequencertimeout = parseInt(time);

		}else{
			alert("Error: Sequencer Time Limit must be integer between 5 - 180");
		}
	}
//   COMPONENT STRAND LIST


	update_Component_StrandList(data)
	{

		this.component_strandlist = data.updatedComponentlist;
		this.emit("Change_Component_Strandlist");


		//check full strandlist if all components exist in component list. if not, then delete full strand
		let updatedfulllist = [];
		let deletedcomponent = data.deletedComponent;
		
		for(let i = 0 ; i < this.full_strandlist.length; i ++)
		{
			let fullstrand = this.full_strandlist[i];
			let checkpoint = false;
			for (let y = 0; y < fullstrand.components.length; y++)
			{
				if(fullstrand.components[y] == deletedcomponent)
				{
					checkpoint = true;
					break;
				}
			}			
			if(checkpoint == false)
				updatedfulllist.push(fullstrand);
		}
		if(this.full_strandlist.length != updatedfulllist.length)
		{
			this.full_strandlist = updatedfulllist;
			this.emit("Change_Full_Strandlist");
		}
	}

	add_Component_StrandList(NewStrand)
	{
		let checkpoint = false;
		for(let i = 0; i < this.component_strandlist.length;i++)
		{
			if(this.component_strandlist[i].name == NewStrand.name)
			{
				 checkpoint = true;
				 alert("Error: Name Already Exists in Strand List");
			}
		}
		if(NewStrand.blueprint.split("-").length != NewStrand.length)
		{
			 checkpoint = true;
			 alert("Error: Blueprint Length =/= Strand Length");
		}
		if(checkpoint == false)
		{
			NewStrand.sequence = this.random_Sequence_Generator(NewStrand.length,NewStrand.blueprint);
			this.component_strandlist.push(NewStrand);
			this.emit("Change_Component_Strandlist");
		}
	}	


//   FULL STRAND LIST


	update_Full_StrandList(StrandlistUpdate2)
	{
		this.full_strandlist = StrandlistUpdate2;
		this.emit("Change_Full_Strandlist");
	}
	add_Full_StrandList(NewStrand)
	{
		let checkpoint = false;
		for(let i = 0; i < this.full_strandlist.length;i++)
		{
			if(this.full_strandlist[i].name == NewStrand.name)
			{
				 checkpoint = true;
				 alert("Name Already Exists in Strand List");
			}
		}
		if(checkpoint == false)
		{
			this.full_strandlist.push(NewStrand);
			this.emit("Change_Full_Strandlist");
		}
	}

	print_StrandList()
	{
		let finalresults = "";
		for(let i = 0 ; i < this.full_strandlist.length; i ++)
		{
			finalresults = finalresults + this.full_strandlist[i].name;
			finalresults = finalresults + "[" + this.full_strandlist[i].componentsdisplay + "]:\n";
			finalresults = finalresults + this.fullStrandSequenceBuilder(this.full_strandlist[i].components) + "*";
		}
		this.dataAnalysis_Results = ["PRINT",finalresults];
	}



 //   AXIOS POST METHODS
	compare_DataAnalysis(strandsToCompare)
	{
		this.javaprogramstatus = true;
		this.emit("Java_Status_Updater");
		var strandlistStoreReference = this;

		let seq1 = this.fullStrandSequenceBuilder(strandsToCompare[0].components);
		let loop1 = strandsToCompare[0].loop;

		let seq2 = seq1;
		let loop2 = loop1;
		if(strandsToCompare.length == 2){
			seq2 = this.fullStrandSequenceBuilder(strandsToCompare[1].components);
			let loop2 = strandsToCompare[1].loop;
		}



		return axios.post('/DNASequenceProgram/Compare', {
			salt:this.conditions.Salt,
 			concentration: this.conditions.Concentration ,
			strand1:{ 
				name: "A" , 
				sequence:seq1   
			},
			strand2:{ 
				name: "B" ,  
				sequence:seq2  
			}

 		}).then(function(response){
			strandlistStoreReference.dataAnalysis_Results = ["COMPARE",response.data.result];
			strandlistStoreReference.emit("Update_Results");
			strandlistStoreReference.javaprogramstatus = false;
			strandlistStoreReference.emit("Java_Status_Updater");
 		});
	}

	compare_ToolsAnalysis(strandsToCompare)
	{
		let strandlistStoreReference = this;
		let loop1 = strandsToCompare[2];
		let loop2 = strandsToCompare[5];

		return axios.post('/DNASequenceProgram/Compare', {
			salt:this.conditions.Salt,
 			concentration: this.conditions.Concentration ,
			strand1:{ 
				name: strandsToCompare[0], 
				sequence:strandsToCompare[1]   
			},
			strand2:{ 
				name: strandsToCompare[3],  
				sequence:strandsToCompare[4]  
			}
 		}).then(function(response)
 		{
			strandlistStoreReference.toolsAnalysis_results = response.data.result;
			strandlistStoreReference.emit("Update_ToolsAnalysisResults");
 		});
	}


 	runSequencer()
 	{ 

 	// "strandname,length,complement,mismatch,self,blueprint,meltingpoint
		this.javaprogramstatus = true;
		this.emit("Java_Status_Updater");
		
 		let list = [];
 		let strandlistStoreReference = this;

 		for(var i = 0; i < this.component_strandlist.length; i ++)
 		{
 			list.push( 
 				this.component_strandlist[i].name+","+
 				String(this.component_strandlist[i].length)+","+
 				String(this.component_strandlist[i].complement)+","+
 				String(this.component_strandlist[i].mismatch)+","+
 				String(this.component_strandlist[i].self)+","+
 				this.component_strandlist[i].blueprint + ","+ 
 				this.component_strandlist[i].meltingpoint
 			)
 		}

 		return axios.post('/DNASequenceProgram', {

 			salt:this.conditions.Salt,
 			concentration: this.conditions.Concentration ,
 			strandlist:list

 		}).then(function(response)
 		{
 			console.log(response.data.strandlist);
			let responseStrandlist = response.data.strandlist;
			for(var a = 0;a < responseStrandlist.length;a++)
			{
				for(var b = 0; b < strandlistStoreReference.component_strandlist.length; b++)
				{
					if(responseStrandlist[a].split(":")[0] == strandlistStoreReference.component_strandlist[b].name)
					{
						strandlistStoreReference.component_strandlist[b].sequence = responseStrandlist[a].split(":")[1];
						break;
					}
				}
			} 	

			strandlistStoreReference.javaprogramstatus = false;
			strandlistStoreReference.emit("Java_Status_Updater");
			strandlistStoreReference.emit("Change_Strandlist");
 		});
 	}


// Action Handler

	handleActions(action)
	{
		switch(action.type){
			case "SEQUENCE_STRANDLIST":{
				this.runSequencer();
				break;
			}

			case "ADD_COMPONENT_STRANDLIST" : {
				this.add_Component_StrandList(action.StrandAdd);
				break;
			}
			case "UPDATE_COMPONENT_STRANDLIST" : {
				this.update_Component_StrandList(action.StrandlistUpdate);
				this.emit("Change_Component_Strandlist");
				break;
			}

			case "ADD_FULL_STRANDLIST" : {
				this.add_Full_StrandList(action.StrandAdd2);
				break;
			}
			case "UPDATE_FULL_STRANDLIST" : {
				this.update_Full_StrandList(action.StrandlistUpdate2);
				this.emit("Change_Full_Strandlist");
				break;
			}
			case "EDIT_PROJECTNAME" : {
				this.projectname = action.ProjectName;
				this.emit("Change_Name");
				break;
			}
			case "EDIT_SALT" : {
				this.conditions.Salt = action.Conditions1;
				this.emit("Change_Condition");
				break;
			}
			case "EDIT_SALT_CONCENTRATION" : {
				this.conditions.Concentration = action.Conditions2;
				this.emit("Change_Condition");
				break;
			}
			case "EDIT_WORKSPACE_DISPLAY": {
				this.workspaceDisplay = action.Display1;
				this.emit("Change_Workspace_Display");
				break;
			}
			case "UPDATE_SEQUENCER_STATUS":{
				this.javaprogramstatus = action.status1;
 				this.emit("Java_Status_Updater");
				break;
			}
			case "UPDATE_SEQUENCER_TIMEOUT":{
				this.updateSequencerTimeout(action.time);
				this.emit("Update_Sequencer_Timeout");
				break;
			}

			case "COMPARE_STRANDS":{
				this.compare_DataAnalysis(action.strands);
				break;
			}
			case "COMPARE_STRANDS_TA":{
				this.compare_ToolsAnalysis(action.strands2);
				break;
			}
			case "PRINT_STRANDLIST":{
				this.print_StrandList();
				this.emit("Update_Results");
				break;
			}
		}
	}


	// 		STRAND METHODS

	fullStrandSequenceBuilder(componentlist)
	{
		let finalresults = "";

		for (let h = 0 ; h < componentlist.length; h ++)
		{
			
			//account for complements
			let componentname = componentlist[h];
			let complement = false;
			
			if(componentname.includes("'"))
			{
				complement = true
				componentname = componentname.replace("'", "");
			}

			//find complement sequence and add it to 
			for(let g = 0 ; g < this.component_strandlist.length; g++)
			{

				if(componentname == this.component_strandlist[g].name)
				{
					if(complement == false)
					{
						finalresults = finalresults + this.component_strandlist[g].sequence
					}else{
						finalresults = finalresults + this.complement_Maker(this.component_strandlist[g].sequence);
					}
					break;
				}
			}
		}
		return finalresults;
	}



	// Utility functions
 	random_Sequence_Generator(length,blue)
 	{
 		var sequence = "";
 		var blueprint = blue.split("-");
 		for(var i = 0; i < length;i ++)
 		{
			var random = Math.ceil(Math.random() * 4);
			if(blueprint[i] == 'A' || blueprint[i] == 'T'|| blueprint[i] == 'C'|| blueprint[i]=='G')
			{
				sequence = sequence + blueprint[i];
			} else if(random == 1){	
				sequence = sequence + "A";
			} else if(random == 2){ 
				sequence = sequence + "T";
			} else if(random == 3){ 
				sequence = sequence + "C";
			}else{ 
				sequence = sequence + "G";
			}
 		}
 		return sequence; 
 	}

 	complement_Maker(sequence){
		let input = sequence.split('');
		let comp = "";
		for(let i = 0 ; i < input.length ; i ++)
		{
			let string1 = input[i];
			if(string1.toUpperCase() == "A")
			{
				string1 = "T";
			}
			else if(string1.toUpperCase() == "T")
			{
				string1 = "A";
			}
			else if(string1.toUpperCase() == "C")
			{
				string1 = "G";
			}
			else if(string1.toUpperCase() == "G")
			{
				string1 = "C";
			}
			comp = comp + string1;
		}
		//reverse 
		let reverse = comp.split("").reverse();
		reverse = reverse.join("");
		return reverse;  // 5 prime to 3 prime complement
 	}
	//
}


const strandlistStore = new StrandlistStore;
	
Dispatcher.register(strandlistStore.handleActions.bind(strandlistStore));

export default strandlistStore;



