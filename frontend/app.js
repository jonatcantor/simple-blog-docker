let editId = null;

async function fetchPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';

  if (!Array.isArray(posts)) {
    container.innerText = 'Error cargando posts';
    return;
  }

  posts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h3>${escapeHtml(p.title)}</h3>
      <div class="meta">${new Date(p.created_at).toLocaleString()}</div>
      <div>${escapeHtml(p.content)}</div>
      <button onclick="startEdit(${p.id}, \`${escapeHtml(p.title)}\`, \`${escapeHtml(p.content)}\`)">Editar</button>
      <button onclick="deletePost(${p.id})">Eliminar</button>
    `;
    container.appendChild(div);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (!title || !content) return alert('Título y contenido obligatorios');

  let res;
  if (editId !== null) {
    res = await fetch(`/api/posts/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
  } else {
    res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
  }

  if (res.ok) {
    resetForm();
    await fetchPosts();
  } else {
    const err = await res.json();
    alert('Error: ' + (err.error || JSON.stringify(err)));
  }
});

function resetForm() {
  editId = null;
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.querySelector('#postForm button[type="submit"]').textContent = 'Crear entrada';
}

function startEdit(id, title, content) {
  editId = id;
  document.getElementById('title').value = title;
  document.getElementById('content').value = content;
  document.querySelector('#postForm button[type="submit"]').textContent = 'Guardar cambios';
}

async function deletePost(id) {
  if (!confirm('¿Eliminar este post?')) return;
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (res.ok) {
    await fetchPosts();
  } else {
    const err = await res.json();
    alert('Error: ' + (err.error || JSON.stringify(err)));
  }
}

fetchPosts();
