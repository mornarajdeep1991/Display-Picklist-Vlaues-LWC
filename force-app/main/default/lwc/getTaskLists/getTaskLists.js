import { LightningElement,wire,track} from 'lwc';
import gettaskliststodisplay from '@salesforce/apex/DisplayTasksController.gettaskliststodisplay';

export default class getTaskLists extends LightningElement {
    @track items = []; //this will hold key, value pair
    @track value = ''; //initialize combo box value
    @track chosenValue = '';
    @track updateditems;
    @wire(gettaskliststodisplay)
     wiredRecords({ error, data }) {
        window.console.log('before data====='+data);
    if (data) {
           window.console.log('data====='+JSON.stringify(data));
        //create array with elements which has been retrieved controller
        //here value will be record Id and label of combobox will be Name of record
      //  for(let i=0; i<data.length; i++)  {
        //     this.items = [...this.items ,{value: data[i].Id , label: data[i].Name} ];                                   
        //} 
        for(let i=0; i<data.length; i++)  {
            console.log('i==='+data[i].groupnames);
            this.ops =  [
                { label: data[i].groupnames, value: data[i].groupnames }
              ];
              this.opslist = this.ops;                                  
       }  
       console.log('ops==='+this.ops);   
       console.log('ops==='+JSON.stringify(this.opslist));   
       this.updateditems = this.opslist; 
        window.console.log('this.items== after for'+JSON.stringify(this.updateditems));        
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
         alert('test');
        const selectedOption = event.detail.value;
    console.log('selected value=' + selectedOption);
    this.chosenValue = selectedOption;
}

//this value will be shown as selected value of combobox item
get selectedValue(){
    return this.chosenValue;
}
}