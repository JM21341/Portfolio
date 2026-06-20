const API = '/Main Portfolio/scripts/database/projects.php';
 
// -----------------------------------------------
// CARD BUILDER
// -----------------------------------------------
 
function createCard(project) {
    const a = document.createElement('a');
    a.className = 'project-card';
    a.href = project.href;
 
    a.innerHTML = `
        <div class="card-info">
            <div class="card-icon">${project.lang}</div>
            <div class="card-title">${project.title}</div>
            <div class="card-tags">
                ${project.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            </div>
        </div>
        <div class="card-preview">
            <div class="preview-dots">
                <div class="preview-dot"></div>
                <div class="preview-dot"></div>
                <div class="preview-dot"></div>
            </div>
            <div class="preview-cta">View Project</div>
        </div>
    `;
 
    return a;
}
 
// -----------------------------------------------
// FETCH & RENDER
// -----------------------------------------------
 
async function loadProjects() {
    const container = document.getElementById('projects-container');
    const addBtn = document.getElementById('add-project-btn');
 
    container.querySelectorAll('.project-card, #projects-empty').forEach(el => el.remove());
 
    try {
        const res  = await fetch(API);
        const data = await res.json();
 
        if (data.error) throw new Error(data.error);
 
        if (data.length === 0) {
            const empty = document.createElement('p');
            empty.id = 'projects-empty';
            empty.textContent = 'No projects yet — check back soon.';
            container.insertBefore(empty, addBtn);
            return;
        }
 
        data.forEach(p => container.insertBefore(createCard(p), addBtn));
 
    } catch (err) {
        console.error('Failed to load projects:', err);
        const errMsg = document.createElement('p');
        errMsg.id = 'projects-empty';
        errMsg.textContent = 'Could not load projects. Make sure the server is running.';
        container.insertBefore(errMsg, addBtn);
    }
}
 
// -----------------------------------------------
// MODAL — open / close / reset
// -----------------------------------------------
 
function openModal() {
    document.getElementById('project-modal').classList.add('active');
    document.getElementById('modal-title').focus();
}
 
function closeModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.getElementById('modal-title').value = '';
    document.getElementById('modal-lang').value = '';
    document.getElementById('modal-tags').value = '';
    document.getElementById('modal-href').value = '';
    document.getElementById('modal-error').textContent = '';
    document.getElementById('modal-submit').disabled   = false;
    document.getElementById('modal-submit').textContent = 'Add Project';
}
 
// -----------------------------------------------
// SUBMIT — POST to PHP, then reload cards
// -----------------------------------------------
 
async function handleAddProject() {
    const title   = document.getElementById('modal-title').value.trim();
    const lang    = document.getElementById('modal-lang').value.trim();
    const tags    = document.getElementById('modal-tags').value.trim();
    const href    = document.getElementById('modal-href').value.trim();
    const errorEl = document.getElementById('modal-error');
    const submitBtn = document.getElementById('modal-submit');
 
    if (!title || !lang || !tags || !href) {
        errorEl.textContent = 'Please fill in all fields.';
        return;
    }
 
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving…';
    errorEl.textContent = '';
 
    try {
        const res  = await fetch(API, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ lang, title, tags, details: href })
        });
        const data = await res.json();
 
        if (data.error) throw new Error(data.error);
 
        closeModal();
        await loadProjects();
 
    } catch (err) {
        console.error('Failed to add project:', err);
        errorEl.textContent = 'Failed to save. Check your server connection.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Project';
    }
}
 
// -----------------------------------------------
// INIT
// -----------------------------------------------
 
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
 
    document.getElementById('add-project-btn').addEventListener('click', openModal);
    document.getElementById('modal-cancel').addEventListener('click', closeModal);
    document.getElementById('modal-submit').addEventListener('click', handleAddProject);
 
    document.getElementById('project-modal').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeModal();
    });
});