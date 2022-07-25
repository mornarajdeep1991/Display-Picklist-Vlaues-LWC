import { api, LightningElement, wire, track } from 'lwc';
const columns = [
    { label: 'id', fieldName: 'id' },
    {
        label: 'subject',
        fieldName: 'subject',
        type: 'text',
        sortable: true,
        cellAttributes: { alignment: 'center' },
    },
    { label: 'owner', fieldName: 'owner', type: 'text' }
];
import displaytasks from '@salesforce/apex/DisplayTasksController.displaytasks';
export default class DisplayTasks extends LightningElement {
    @track updateditems;
    @api taskOwnerName;
    @track items;
    
    @wire(displaytasks,{ownerValue: '$taskOwnerName'})
wiredRecords({ error, data }) {

if(data){
console.log('data======'+JSON.stringify(data));
this.data1 = [];
for(let i=0; i<data.length; i++)  {
    console.log('i==='+i);
    console.log('datai==='+data[i].Subject);
    console.log('i owner==='+data[i].Owner.Name);
    
    this.data1.push({ id: i, subject: data[i].Subject, owner: data[i].Owner.Name });
                                    
} 
this.updateditems = this.data1;  
console.log('updated=='+JSON.stringify(this.updateditems));
}else{

console.log(error);

}


}
    items = this.updateditems;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
sortBy(field, reverse, primer) {
    const key = primer
        ? function (x) {
              return primer(x[field]);
          }
        : function (x) {
              return x[field];
          };

    return function (a, b) {
        a = key(a);
        b = key(b);
        return reverse * ((a > b) - (b > a));
    };
}

onHandleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.data];

    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.data = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
}

}