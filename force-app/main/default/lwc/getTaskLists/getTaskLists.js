import { LightningElement,wire,track} from 'lwc';
import gettaskliststodisplay from '@salesforce/apex/DisplayTasksController.gettaskliststodisplay';

export default class getTaskLists extends LightningElement {
@track items = []; //this will hold key, value pair
@track value = ''; //initialize combo box value
@track chosenValue = '';
@track updateditems;
@wire(gettaskliststodisplay)
wiredRecords({ error, data }) {

if (data) {
    
//create array with elements which has been retrieved controller
//here value will be record Id and label of combobox will be Name of record

this.options = [];
for(let i=0; i<data.length; i++)  {
    
    
        this.options.push({ label: data[i].groupnames, value: data[i].groupnames });
                                        
}  
this.updateditems = this.options;      
this.error = undefined;
} else if (error) {
this.error = error;
window.console.log('this.errors=='+this.error);
}
}

get recordOptions() {
return this.updateditems;                        
}

        handleChange(event) {
    // Get the string of the "value" attribute on the selected option

const selectedOption = event.detail.value;

this.chosenValue = selectedOption;
}

//this value will be shown as selected value of combobox item
get selectedValue(){
return this.chosenValue;
}
}