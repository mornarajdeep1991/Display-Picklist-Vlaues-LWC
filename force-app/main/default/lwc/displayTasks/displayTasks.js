import { api, LightningElement, wire, track } from 'lwc';

import displaytasks from '@salesforce/apex/DisplayTasksController.displaytasks';
export default class DisplayTasks extends LightningElement {
@track dataWrapperList;
@api taskOwnerName;
@track updateditems;
@track columns = [
    { label: 'Task Name', fieldName: 'tksubject',type:'url',typeAttributes: {label: { fieldName: 'subject' }, target: '_blank'} },
    {
        label: 'Description',
        fieldName: 'Description',
        type: 'text',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    { label: 'Owner', fieldName: 'owner', type: 'text' }
];
@track data;
@wire(displaytasks,{ownerValue: '$taskOwnerName'})
wiredRecords({ error, data }) {

if(data){
console.log('data======'+JSON.stringify(data));
let dataWrapList = [];
let i=0;
data.forEach(itm => {
let dWrap = {};
dWrap.subject=itm.Subject;
dWrap.tksubject='/'+itm.Id;
dWrap.Description=itm.Description;
dWrap.owner=itm.Owner.Name;
dataWrapList.push(dWrap);
});
this.dataWrapperList = dataWrapList;
/*for(let i=0; i<data.length; i++)  {
console.log('i==='+i);
console.log('datai==='+data[i].Subject);
console.log('i owner==='+data[i].Owner.Name);

this.data1.push({ id: i+1, subject: data[i].Subject, owner: data[i].Owner.Name });
                                
} 
this.updateditems = this.data1;  */
console.log('updated=='+JSON.stringify(this.dataWrapperList));

}else{

console.log(error);

}


}
    data=this.dataWrapperList;
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
const cloneData = [...this.dataWrapperList];

cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
this.dataWrapperList = cloneData;
this.sortDirection = sortDirection;
this.sortedBy = sortedBy;
}

}