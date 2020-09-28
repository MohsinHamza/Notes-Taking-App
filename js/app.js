console.log("Welcome the Magic Notes, This is app.js");
showNote();
let prog = document.getElementById('pro');
let addBtn = document.getElementById("AddBtn");
addBtn.addEventListener("click",function(e){
    let addTxt = document.getElementById("AddTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if(addTxt.value == "" && addTitle.value == "")
   {
	alert("Please enter notes");
}

else{
    if (notes == null){
        notesObj = [];
        prog.value = notesObj.length;
    }else{
        notesObj = JSON.parse(notes);
    }

    if( notesObj.length < 10)  {
        notesObj.push([addTxt.value,addTitle.value]);
        prog.value = notesObj.length;
        localStorage.setItem("notes",JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
        showNote();
    }else{
            addTxt.value= "Limit reached no further notes can be added";
        addTitle.value= "";
       // console.log(notesObj);
        
    }
}
});

function showNote(){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
        html+= `
        <div class="noteCard my-2 mx-2" style="width: 18rem;border:2px solid black;">
        <div class="card-body">
          <h5 class="card-title">${element[1]}</h5>
          <p class="card-text">${element[0]}</p>
          <button id="${index}" onclick="DeleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
        `
    });
    let notesElem = document.getElementById("notes");
    if(notesElem.length != 0){
        notesElem.innerHTML = html;
    }else{
        notesElem.innerHTML = "No notes availabel";
    }
}
function DeleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    prog.value = notesObj.length;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNote();
    console.log(notesObj);
}
let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    if (noteCard.length ==1){
    	 let cardTxt = noteCard.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    }
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
})
function deleteAll(){
    let notes = localStorage.getItem("notes");
    //console.log()
    if(notes == null){
        return;
    }else{
        notesObj = JSON.parse(notes);
        notesObj.splice(0,notesObj.length);
        localStorage.setItem("notes",JSON.stringify(notesObj));
       prog.value= "" ;       
    }
    localStorage.clear();  
    showNote();
}