document.addEventListener("DOMContentLoaded", () => {
    // getting refernces of DOM elements
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const noteInput = document.getElementById('noteInput');
    const notesListContainer = document.getElementById('presaved-notes-container');

    // intializing notes array
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNodeIndex = null;

    const displayPreSavedNotes = () => {
        notesListContainer.innerHTML = ""; 

        notesListContainer.innerHTML = notes.map((note, index) => {
            return `<li key=${index}>
                        ${note}
                        <button class="editNoteBtn" data-noteIndex="${index}">Edit</button>
                    </li>`;
        }).join('');
        
        addEditBtnListeners();
    };

    const saveNote = () => {
        const noteTextInput = noteInput.value.trim();
        if (noteTextInput === "") return;

        if (currentNodeIndex !== null) {
            notes[currentNodeIndex] = noteTextInput;
            currentNodeIndex = null; 
        } else {
            notes.push(noteTextInput);
        }

        updateNotesInLocalStorage(notes);
        noteInput.value = ""; 
        displayPreSavedNotes(); 
    };

    const updateNotesInLocalStorage = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const addEditBtnListeners = () => {
        const editButtons = notesListContainer.querySelectorAll('.editNoteBtn');
        // remove older event listeners to prevent duplicacy 
        editButtons.forEach(btn => {
            btn.removeEventListener('click', handleEditNode); 
            btn.addEventListener('click', handleEditNode); 
        });
    };

    const handleEditNode = (e) => {
        e.stopPropagation();
        currentNodeIndex = parseInt(e.target.getAttribute('data-noteIndex')); 
        noteInput.value = notes[currentNodeIndex];
        // console.log({ notes, currentNodeIndex }, notes[currentNodeIndex]);
    };

    saveNoteBtn.addEventListener('click', saveNote);

    displayPreSavedNotes(); 
});
