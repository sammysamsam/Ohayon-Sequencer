import dispatcher from "../Dispatcher";
	export function Update_Sequencer_Timeout(){
		dispatcher.dispatch({
			type:"UPDATE_SEQUENCER_TIMEOUT",
			time,
		});
	}
	
	export function SequenceStrandlist(){
		dispatcher.dispatch({
			type:"SEQUENCE_STRANDLIST",
		});
	}
	
	export function Add_Component_StrandList(StrandAdd){
		dispatcher.dispatch({
			type:"ADD_COMPONENT_STRANDLIST",
			StrandAdd,
		});
	}

	export function Update_Component_Strandlist(StrandlistUpdate){
		dispatcher.dispatch({
			type:"UPDATE_COMPONENT_STRANDLIST",
			StrandlistUpdate,
		});
	}
	export function Add_Full_StrandList(StrandAdd2){
		dispatcher.dispatch({
			type:"ADD_FULL_STRANDLIST",
			StrandAdd2,
		});
	}

	export function Update_Full_Strandlist(StrandlistUpdate2){
		dispatcher.dispatch({
			type:"UPDATE_FULL_STRANDLIST",
			StrandlistUpdate2,
		});
	}

	export function EditProjectName(ProjectName){
		dispatcher.dispatch({
			type:"EDIT_PROJECTNAME",
			ProjectName,
		});
	}

	export function EditSaltConcentration(Conditions2){
		dispatcher.dispatch({
			type:"EDIT_SALT_CONCENTRATION",
			Conditions2,
		});
	}
	export function EditSalt(Conditions1){
		dispatcher.dispatch({
			type:"EDIT_SALT",
			Conditions1,
		});
	}
	export function EditWorkspaceDisplay(Display1){
		dispatcher.dispatch({
			type:"EDIT_WORKSPACE_DISPLAY",
			Display1,
		});
	}
	export function GetResults(results){
		dispatcher.dispatch({
			type:"UPDATE_RESULT",
			results,
		});
	}
	export function CompareStrands(strands){
		dispatcher.dispatch({
			type:"COMPARE_STRANDS",
			strands,
		});
	}
	export function CompareStrandsTA(strands2){
		dispatcher.dispatch({
			type:"COMPARE_STRANDS_TA",
			strands2,
		});
	}
	export function PrintStrandList(){
		dispatcher.dispatch({
			type:"PRINT_STRANDLIST"
		});
	}
	export function PrintComponentList(){
		dispatcher.dispatch({
			type:"PRINT_COMPONENTLIST"
		});
	}
