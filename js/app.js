const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

addbtn.addEventListener(
    "click",
    function()
    {
        addNote()
    }
)
const saveNotes = () =>{
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note)=>{
            data.push(note.value)
        }
    )
    console.log(data);
    if(data.length === 0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
}

const addNote =(text ="") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
</div>
<textarea autofocus>${text}</textarea>
    `;
note.querySelector(".save").addEventListener(
    "click",
    function(){
        saveNotes();
    }
)
note.querySelector(".trash").addEventListener(
    "click",
    function(){
        note.remove();
        saveNotes()
    }
)
//auto saving notes on focusout from textarea
note.querySelector("textarea").addEventListener(
    "focusout",
    function(){
        saveNotes();
    }
)
main.appendChild(note);
saveNotes()
}
//self calling function
(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        console.log(lsnotes);
        if(lsnotes=== null){
            addNote();
        }else{
            lsnotes.forEach(
                (lsnotes)=>{
                    addNote(lsnotes)
                }
            )
        }
       
    }
)()