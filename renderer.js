document.addEventListener("DOMContentLoaded",()=>{
    const saveNoteBtn = document.getElementById('saveNoteBtn')
    const noteInput = document.getElementById('noteInput')
    const notesListDiv = document.getElementById('preSavedNotesList')

    let notes = JSON.parse(localStorage.getItem('notes')) || []

    const displayPreSavedNotes = (notes) =>{
        notesListDiv.innerHTML = notes.map((note,index)=>{
            `<li key=${index}>
                ${note}
                <button class="editNoteBtn" data-noteIndex=${index}>Edit</button>
            </li>`
        })
    }

    const saveNote = () =>{
        // if(noteInput.value.trim() === "")   return
        const note = noteInput.value.trim()
        if(note === "") return
        
        notes.push(note)
        updateNotesInLocalStorage(notes)
        noteInput.value= ""
        displayPreSavedNotes()        
    }

    const updateNotesInLocalStorage = (notes) =>{
        localStorage.setItem('notes',JSON.stringify(notes))
    }



    saveNoteBtn.addEventListener('click',(e)=>{
        saveNote()
    })


    displayPreSavedNotes()
})