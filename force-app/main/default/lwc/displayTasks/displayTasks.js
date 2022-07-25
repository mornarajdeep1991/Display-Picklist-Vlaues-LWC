import { api, LightningElement, wire, track } from 'lwc';

import displaytasks from '@salesforce/apex/DisplayTasksController.displaytasks';
export default class DisplayTasks extends LightningElement {
@track dataWrapperList;
@api taskOwnerName;
@track updateditems;
@track columns = [
    { label: 'Task Name', fieldName: 'tksubject',type:'url',sortable: true,typeAttributes: {label: { fieldName: 'subject' }, target: '_blank'} },
    {
        label: 'Description',
        fieldName: 'Description',
        type: 'text',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    {
        label: 'Due Date',
        fieldName: 'ActivityDate',
        type: 'date',
        sortable: true
    },
    { label: 'Owner', fieldName: 'owner', type: 'text',sortable: false}
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
dWrap.ActivityDate=itm.ActivityDate;
dWrap.owner=itm.Owner.Name;
dataWrapList.push(dWrap);
});
this.dataWrapperList = dataWrapList;
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