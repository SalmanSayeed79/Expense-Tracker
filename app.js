db.collection('expenses').orderBy('date').onSnapshot((snapshot)=>{
    //console.log(snapshot.docChanges().type)
    snapshot.docChanges().forEach((a)=>{
        //console.log(snapshot.docChanges().type)
        if (a.type=="added"){
        //our data will be a.doc.data()
        let data=a.doc;
        addItem(data);}
        else if(a.type=="removed"){
            let li=list.querySelector('[data-id='+a.doc.id+']');
            list.removeChild(li);
        }
    })
})


//taking input and converting them into list items
var list=document.querySelector("#items")
function addItem(p){
    let itemList=document.createElement("li");
    let name=document.createElement('span');
    let date=document.createElement('span');
    let amount=document.createElement('span');
    let cross=document.createElement('div')


    name.innerText=p.data().name;
    date.innerText=p.data().date;
    amount.innerText=p.data().amount;
    cross.innerText="X";


    itemList.appendChild(name);
    itemList.appendChild(date);
    itemList.appendChild(amount);
    itemList.appendChild(cross);

    let id=p.id;
    itemList.setAttribute('data-id',id);

    list.appendChild(itemList);


    //deleting item on clicking cross
    cross.addEventListener("click",(e)=>{
        db.collection('expenses').doc(id).delete();
    })

}

//Adding items to the list and sending them to the database
let addButton=document.querySelector("#submit");
let form=document.querySelector("#form")
addButton.addEventListener("click",(e)=>{
    e.preventDefault();
    db.collection('expenses').add({
        name:form.item.value,
        date:form.date.value,
        amount:form.amount.value
    })
    form.item.value='';
    form.date.value='';
    form.amount.value='';
})