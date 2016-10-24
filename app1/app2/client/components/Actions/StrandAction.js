import dispatcher from "../Dispatcher";

	export function SequenceStrandlist(){
		dispatcher.dispatch({
			type:"SEQUENCE_STRANDLIST"
		});
	}
	
	export function AddStrandList(StrandAdd){
		dispatcher.dispatch({
			type:"ADD_STRANDLIST",
			StrandAdd,
		});
	}

	export function UpdateStrandlist(StrandlistUpdate){
		dispatcher.dispatch({
			type:"UPDATE_STRANDLIST",
			StrandlistUpdate,
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
	export function EditActiveDisplay1(Display1){
		dispatcher.dispatch({
			type:"EDIT_ACTIVE_DISPLAY1",
			Display1,
		});
	}
	export function UpdateSequencerStatus(status1){
		dispatcher.dispatch({
			type:"UPDATE_SEQUENCER_STATUS",
			status1,
		});
	}
	export function UpdateResults(results){
		dispatcher.dispatch({
			type:"UPDATE_RESULT",
			results,
		});
	}

