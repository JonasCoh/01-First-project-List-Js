var taskList = JSON.parse(localStorage.taskList || '[]'); //build array
refreshTaskList();

function refreshTaskList(){
  document.getElementById("taskBoard").innerHTML=''//reset list
  for (i = 0; i < taskList.length; i++) {
    // display objects in divs
    let taskItem=taskList[i];
    var noteNode = document.createElement("div");
    var titleNode = document.createElement("div");
    var pNode = document.createElement("p");
    var cancelNode= document.createElement("div");
    var descNode = document.createTextNode(taskItem.desc);
    var timeNode = document.createTextNode(taskItem.time);
    var cancelText= document.createTextNode("X");
    titleNode.appendChild(descNode);
    titleNode.classList.add("note-content");
    pNode.appendChild(timeNode);
    pNode.classList.add("note-metadata");
    cancelNode.appendChild(cancelText);
    cancelNode.classList.add("cancel");
    console.log(i)
    cancelNode.addEventListener('click' , (e)=>{deleteItemFromList(taskItem.id)});
  
    noteNode.appendChild(titleNode);
    noteNode.appendChild(pNode);
    noteNode.appendChild(cancelNode);
    noteNode.classList.add("note");
    //add id to each note as data
    
    document.getElementById("taskBoard").appendChild(noteNode); //display divs
  }
}

function deleteItemFromList(i){
  let index=taskList.findIndex(x=>x.id==i);
  taskList.splice(index,1);
  localStorage.taskList = JSON.stringify(taskList);
  refreshTaskList();
}

function submitFunc() {
  var task = {
    //build objects
    desc: document.getElementsByTagName("textarea")[0].value,
    time: document.getElementsByTagName("input")[0].value,
    important: document.getElementsByTagName("input")[1].checked,
    id: taskList.length
  };

  taskList.push(task); //put objects inside array
  console.log(taskList)
  localStorage.taskList = JSON.stringify(taskList); //store array with stringify
  refreshTaskList()
  return false; //prevent submit
}
