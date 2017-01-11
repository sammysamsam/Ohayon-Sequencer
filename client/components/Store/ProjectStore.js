import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import axios from "axios";

class ProjectStore extends EventEmitter{
	constructor(){
		super();

		this.component_StrandList = [];
		this.full_StrandList = [];
		this.conditions = {Salt:"Na", Concentration:1.0};

		this.workspaceDisplay = "1";
		this.dataAnalysis_Results = ["",""];

		this.backendStatus = false;  // false = backend is not running any calculations
		
		this.compressedProjectData;
	}


//  Getter Methods

	getConditions()
	{
		return this.conditions;
	}
	getStrandComponents()
	{
		return this.component_StrandList;
	}
	getFullStrands()
	{
		return this.full_StrandList;
	}
	getWorkspaceDisplay()
	{
		return this.workspaceDisplay;
	}
	getBackendStatus()
	{
		return this.backendStatus;
	}

	getJSONProjectData()
	{
		let data = JSON.stringify({C:this.conditions,CL:this.component_StrandList,FSL:this.full_StrandList}); 
		return data;
	}

 // RESULTS
	getDataAnalysisResults()
	{
		return this.dataAnalysis_Results;
	}
 	clearResults()
 	{
 		if(this.dataAnalysis_Results[0] == "COMPARE")
  			 this.dataAnalysis_Results = ["COMPARE",""];
 		else 
 			this.dataAnalysis_Results = ["",""];
 	}


// PROJECT SAVE/LOAD


	loadProject(data)
	{
		this.component_StrandList = data.CL;
		this.full_StrandList = data.FSL;
		this.conditions = data.C;
	}


//   COMPONENT LIST

	print_Component_StrandList()
	{
		let finalresults = [];
		for(let i = 0 ; i < this.component_StrandList.length; i ++)
		{
			let component = this.component_StrandList[i];
			finalresults.push(component.name + " : " + component.sequence);
			if(this.component_StrandList[i].complement == "true")
				finalresults.push(component.name + " ' : " + this.complement_Maker(component.sequence));
		}
		this.dataAnalysis_Results = ["PRINT",finalresults];
	}

	update_Component_StrandList(data)
	{
		


		//update component list
		this.component_StrandList = data.complist;
		this.emit("Change_Component_Strandlist");

		//if any full strands contain deleted component, delete full strand 
		let updatedfulllist = [];
		for(let i = 0 ; i < this.full_StrandList.length; i ++)
		{
			let checkpoint = true;
			for (let y = 0; y < this.full_StrandList[i].components.length; y++)
			{
				if(data.deletedlist.indexOf(this.full_StrandList[i].components[y]) > -1)
				{
					checkpoint = false;
					break;
				}
			}			
			if(checkpoint == true)
				updatedfulllist.push(this.full_StrandList[i]);
		}
		if(this.full_StrandList.length != updatedfulllist.length)
		{
			this.update_Full_StrandList(updatedfulllist);
			this.emit("Change_Full_Strandlist");	
		}
	}

	add_Component_StrandList(NewStrand)
	{
		NewStrand.sequence = this.random_Sequence_Generator(NewStrand.length,NewStrand.blueprint);
		this.component_StrandList.push(NewStrand);
	}	


//   FULL STRAND LIST


	update_Full_StrandList(StrandlistUpdate2)
	{
		this.full_StrandList = StrandlistUpdate2;
	}

	add_Full_StrandList(NewStrand)
	{
		this.full_StrandList.push(NewStrand);
	}

	print_Full_StrandList()
	{
		let finalresults = [];
		for(let i = 0 ; i < this.full_StrandList.length; i ++)
		{
			let fs = this.full_StrandList[i];
			finalresults.push(fs.name + " [ " + fs.componentsDisplay + " ]:\n" + this.fullStrandSequenceBuilder(fs.components));
		}
		this.dataAnalysis_Results = ["PRINT",finalresults];
	}


 //   AXIOS POST METHODS
 
 	fullAnalysis()
 	{
		this.backendStatus = true;
		this.emit("Update_Backend_Status");

		let strandlistStoreReference = this;

 		return axios.post('/DNASequenceProgram/CompareAll', {
 			componentlist: this.component_StrandList,
 			fullstrandlist: this.full_StrandList
 		}).then(function(response){
			strandlistStoreReference.dataAnalysis_Results = ["FULLANALYSIS",response.data.result1,response.data.result2];
			strandlistStoreReference.emit("Update_Results");
			strandlistStoreReference.backendStatus = false;
			strandlistStoreReference.emit("Update_Backend_Status");
 		});

 	}

	compareStrands(strandsToCompare)
	{
		this.backendStatus = true;
		this.emit("Update_Backend_Status");

		//let loop1 = strandsToCompare[0].loop;
		//let loop2 = strandsToCompare[1].loop;
		var strandlistStoreReference = this;
		let strand1 = { 
			sequence:this.fullStrandSequenceBuilder(strandsToCompare[0].components)  
		}
		let strand2 = { 
			sequence:this.fullStrandSequenceBuilder(strandsToCompare[1].components)
		}

		return axios.post('/DNASequenceProgram/Compare', {
			salt:this.conditions.Salt,
 			concentration: this.conditions.Concentration ,
			strand1,strand2
 		}).then(function(response){
			strandlistStoreReference.dataAnalysis_Results = ["COMPARE",response.data.result];
			strandlistStoreReference.emit("Update_Results");
			strandlistStoreReference.backendStatus = false;
			strandlistStoreReference.emit("Update_Backend_Status");
 		});
	}

 	runSequencer(timelimit)
 	{ 
		this.backendStatus = true;
		this.emit("Update_Backend_Status");
		
		let strandlistStoreReference = this;
 		return axios.post('/DNASequenceProgram/', {
 			timelimit: timelimit,
 			salt: this.conditions.Salt,
 			concentration: this.conditions.Concentration ,
 			componentlist: this.component_StrandList,
 			fullstrandlist: this.full_StrandList
 		}).then(function(response){

			let updatedComponentList = response.data.updatedComponentList;
			for(var a = 0;a < updatedComponentList.length;a++)
			{
				for(var b = 0; b < strandlistStoreReference.component_StrandList.length; b++)
				{
					if(updatedComponentList[a].split(":")[0] == strandlistStoreReference.component_StrandList[b].name)
					{
						strandlistStoreReference.component_StrandList[b].sequence = updatedComponentList[a].split(":")[1];
						break;
					}
				}
			} 	
			strandlistStoreReference.backendStatus = false;
			strandlistStoreReference.emit("Update_Backend_Status");
			strandlistStoreReference.emit("Change_Component_Strandlist");
 		});
 	}


// Action Handler

	handleActions(action)
	{
		switch(action.type){

			case "OPEN_PROJECT":{
				this.loadProject(action.data);
				this.emit("Change_Component_Strandlist");
				this.emit("Change_Condition");
				this.emit("Change_Full_Strandlist");
				this.emit("Open_Project");
				break;
			}
//

			case "EDIT_WORKSPACE_DISPLAY": {
				this.workspaceDisplay = action.Display1;
				this.emit("Change_Workspace_Display");
				break;
			}

//
			case "UPDATE_BACKEND_STATUS":{
				this.backendStatus = action.status1;
 				this.emit("Update_Backend_Status");
				break;
			}
			case "SEQUENCE_STRANDLIST":{
				this.runSequencer(action.time);
				break;
			}
			case "FULL_ANALYSIS":{
				this.fullAnalysis();
				break;
			}
			case "COMPARE_STRANDS":{
				if(action.strands.length == 0)
				{
					this.dataAnalysis_Results = ["COMPARE",""];
					this.emit("Update_Results");
				}
				else
					this.compareStrands(action.strands);
				break;
			}

//
			case "CLEAR_RESULT":{
				this.clearResults();
				this.emit("Update_Results");
				break;
			}
//
			case "PRINT_COMPONENT_STRANDLIST":{
				this.print_Component_StrandList();
				this.emit("Update_Results");
				break;
			}
			case "ADD_COMPONENT_STRANDLIST" : {
				this.add_Component_StrandList(action.StrandAdd);
				this.emit("Change_Component_Strandlist");
				break;
			}
			case "UPDATE_COMPONENT_STRANDLIST" : {
				this.update_Component_StrandList(action.StrandlistUpdate);
				this.emit("Change_Component_Strandlist");
				break;
			}
//
			case "PRINT_FULL_STRANDLIST":{
				this.print_Full_StrandList();
				this.emit("Update_Results");
				break;
			}
			case "ADD_FULL_STRANDLIST" : {
				this.add_Full_StrandList(action.StrandAdd2);
				this.emit("Change_Full_Strandlist");
				break;
			}
			case "UPDATE_FULL_STRANDLIST" : {
				this.update_Full_StrandList(action.StrandlistUpdate2);
				this.emit("Change_Full_Strandlist");
				break;
			}
//		
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
			for(let g = 0 ; g < this.component_StrandList.length; g++)
			{

				if(componentname == this.component_StrandList[g].name)
				{
					if(complement == false)
					{
						finalresults = finalresults + this.component_StrandList[g].sequence
					}else{
						finalresults = finalresults + this.complement_Maker(this.component_StrandList[g].sequence);
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
 		var blueprint = blue.split("");
 		for(var i = 0; i < length;i ++)
 		{
			var random = Math.ceil(Math.random() * 4);
			if(blueprint[i] == 'A' || blueprint[i] == 'T'|| blueprint[i] == 'C'|| blueprint[i]=='G')
				sequence = sequence + blueprint[i];
			else if(random == 1)
				sequence = sequence + "A";
			else if(random == 2) 
				sequence = sequence + "T";
			 else if(random == 3)
				sequence = sequence + "C";
			else
				sequence = sequence + "G";
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


const projectStore = new ProjectStore;
	
Dispatcher.register(projectStore.handleActions.bind(projectStore));

export default projectStore;



