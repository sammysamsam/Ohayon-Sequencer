import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import axios from "axios";


class ToolsAnalysisStore extends EventEmitter{
	constructor(){
		super();
		this.toolsAnalysis_Compare = ["",""];
		this.toolsAnalysis_MeltingPt = 0;
	}


//  Getter Methods
	get_Compare_Results()
	{
		return this.toolsAnalysis_Compare;
	}
	get_Melting_Pt()
	{
		return this.toolsAnalysis_MeltingPt;
	}

 //   AXIOS POST METHODS
	compare_Strands(strandsToCompare)
	{
		let strandlistStoreReference = this;		
		let name = strandsToCompare[0] + " vs " + strandsToCompare[3];
		console.log("lol"+strandsToCompare);
		if(strandsToCompare[2] == "3' to 5'")
			strandsToCompare[1] = strandsToCompare[1].split("").reverse().join("");
		if(strandsToCompare[5] == "3' to 5'")
			strandsToCompare[4] = strandsToCompare[4].split("").reverse().join("");
		
		console.log("lol2"+strandsToCompare);
		return axios.post('/DNASequenceProgram/Compare', {
			strand1:{ 
				sequence: strandsToCompare[1],
				direction: strandsToCompare[2] 
			},
			strand2:{ 
				sequence: strandsToCompare[4],
				direction: strandsToCompare[5]
			}
 		}).then(function(response)
 		{
			strandlistStoreReference.toolsAnalysis_Compare = [name,response.data.data];
			strandlistStoreReference.emit("Update_ToolsAnalysis_Compare");
 		});
	}
	get_MeltingPoint(data)
	{
		let strandlistStoreReference = this;	
		return axios.post('/DNASequenceProgram/MeltingPoint', {
			salt:data.salt,
 			concentration: data.concentration ,
 			sequence: data.sequence,
 			equation: data.equationNumber
 		}).then(function(response)
 		{
			strandlistStoreReference.toolsAnalysis_MeltingPt = response.data.result;
			strandlistStoreReference.emit("Update_ToolsAnalysis_MeltingPoint");
 		});

	}
// Action Handler

	handleActions(action)
	{
		switch(action.type){
			
			case "COMPARE_STRANDS_TA":{
				this.compare_Strands(action.strands2);
				break;
			}
			case"GET_TA_MELTING_POINT":{
				this.get_MeltingPoint(action.input);
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
						finalresults = finalresults + this.component_strandlist[g].sequence
					else
						finalresults = finalresults + this.complement_Maker(this.component_strandlist[g].sequence);
					break;
				}
			}
		//console.log(componentname);
		//console.log(finalresults);
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
				string1 = "T";
			else if(string1.toUpperCase() == "T")
				string1 = "A";
			else if(string1.toUpperCase() == "C")
				string1 = "G";
			else if(string1.toUpperCase() == "G")
				string1 = "C";
			comp = comp + string1;
		}
		//reverse 
		let reverse = comp.split("").reverse();
		reverse = reverse.join("");
		return reverse;  // 5 prime to 3 prime complement
 	}
	//
}


const toolsAnalysisStore = new ToolsAnalysisStore;
	
Dispatcher.register(toolsAnalysisStore.handleActions.bind(toolsAnalysisStore));

export default toolsAnalysisStore;



