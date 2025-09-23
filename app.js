// Day.js setup
if (window.dayjs) {
  if (dayjs.extend) {
    dayjs.extend(window.dayjs_plugin_relativeTime || {});
  }
}

(function () {
  const STORAGE_KEY = "notesApp.notes";

  /** @typedef {{id:string,title:string,content:string,createdAt:number,updatedAt:number}} Note */

  /** @type {HTMLFormElement} */
  const form = document.getElementById("noteForm");
  const noteIdInput = document.getElementById("noteId");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const titleError = document.getElementById("titleError");
  const contentError = document.getElementById("contentError");
  const searchInput = document.getElementById("searchInput");
  const notesList = document.getElementById("notesList");
  const notesCount = document.getElementById("notesCount");
  const exportBtn = document.getElementById("exportBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");

  /** @type {Note[]} */
  let notes = loadNotes();
  let filterText = "";

  function loadNotes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      console.error("Failed to load notes", e);
      return [];
    }
  }

  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  }

  function generateId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  // tags removed

  function clearErrors() {
    titleError.textContent = "";
    contentError.textContent = "";
  }

  function validateForm() {
    clearErrors();
    let ok = true;
    if (titleInput.value.trim().length === 0) {
      titleError.textContent = "Title is required.";
      ok = false;
    }
    if (contentInput.value.trim().length === 0) {
      contentError.textContent = "Note content is required.";
      ok = false;
    }
    return ok;
  }

  function resetFormToCreate() {
    form.reset();
    noteIdInput.value = "";
    document.getElementById("saveBtn").textContent = "Save Note";
  }

  function setFormForEdit(note) {
    noteIdInput.value = note.id;
    titleInput.value = note.title;
    contentInput.value = note.content;
    document.getElementById("saveBtn").textContent = "Update Note";
    titleInput.focus();
  }

  function renderNotes() {
    const query = filterText.toLowerCase();
    const filtered = notes.filter((n) => {
      if (!query) return true;
      const hay = [n.title, n.content].join(" ").toLowerCase();
      return hay.includes(query);
    });

    notesCount.textContent = String(filtered.length);
    notesList.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "note-card";
      empty.innerHTML = "<div class=\"note-content\">No notes yet. Add your first one above.</div>";
      notesList.appendChild(empty);
      return;
    }

    filtered
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .forEach((note) => {
        const card = document.createElement("article");
        card.className = "note-card";
        card.setAttribute("role", "listitem");

        const header = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = note.title || "Untitled";
        header.appendChild(title);

        const meta = document.createElement("div");
        meta.className = "note-meta";
        const updated = window.dayjs
          ? dayjs(note.updatedAt).fromNow()
          : new Date(note.updatedAt).toLocaleString();
        meta.textContent = `Updated ${updated}`;

        // tags removed

        const content = document.createElement("div");
        content.className = "note-content";
        content.textContent = note.content;

        const actions = document.createElement("div");
        actions.className = "note-actions";

        const editBtn = document.createElement("button");
        editBtn.className = "icon-btn";
        editBtn.type = "button";
        editBtn.ariaLabel = "Edit note";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => setFormForEdit(note));

        const delBtn = document.createElement("button");
        delBtn.className = "icon-btn danger";
        delBtn.type = "button";
        delBtn.ariaLabel = "Delete note";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => deleteNote(note.id));

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        card.appendChild(header);
        card.appendChild(meta);
        card.appendChild(content);
        card.appendChild(actions);

        notesList.appendChild(card);
      });
  }

  function upsertNoteFromForm() {
    if (!validateForm()) return;

    const id = noteIdInput.value || generateId();
    const now = Date.now();
    const newNote = {
      id,
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      createdAt: noteIdInput.value ? (notes.find((n) => n.id === id)?.createdAt || now) : now,
      updatedAt: now,
    };

    const existingIndex = notes.findIndex((n) => n.id === id);
    if (existingIndex >= 0) {
      notes[existingIndex] = newNote;
    } else {
      notes.push(newNote);
    }
    saveNotes();
    renderNotes();
    resetFormToCreate();
  }

  function deleteNote(id) {
    const idx = notes.findIndex((n) => n.id === id);
    if (idx === -1) return;
    notes.splice(idx, 1);
    saveNotes();
    renderNotes();
  }

  function clearAll() {
    if (!confirm("This will delete all notes. Continue?")) return;
    notes = [];
    saveNotes();
    renderNotes();
    resetFormToCreate();
  }

  function exportToExcel() {
    if (!window.XLSX) {
      alert("Excel library failed to load.");
      return;
    }
    if (notes.length === 0) {
      alert("No notes to export.");
      return;
    }
    const rows = notes
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((n, i) => ({
        "#": i + 1,
        Id: n.id,
        Title: n.title,
        Content: n.content,
        CreatedAt: new Date(n.createdAt).toISOString(),
        UpdatedAt: new Date(n.updatedAt).toISOString(),
      }));

    const worksheet = XLSX.utils.json_to_sheet(rows, { origin: 0 });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Notes");
    const fileName = `notes-${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(workbook, fileName, { compression: true });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    upsertNoteFromForm();
  });

  form.addEventListener("reset", function () {
    clearErrors();
    resetFormToCreate();
  });

  searchInput.addEventListener("input", function (e) {
    filterText = this.value || "";
    renderNotes();
  });

  exportBtn.addEventListener("click", exportToExcel);
  clearAllBtn.addEventListener("click", clearAll);

  // Init
  renderNotes();
})();


