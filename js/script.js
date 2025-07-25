const apiUrl = 'http://localhost:3000/users';

const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');

async function loadUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();

  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.name} (${user.email})
      <button onclick="deleteUser('${user._id}')">Delete</button>
    `;
    userList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) return;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  nameInput.value = '';
  emailInput.value = '';

  loadUsers();
});

// eslint-disable-next-line no-unused-vars
async function deleteUser(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });

  loadUsers();
}

// Load users on page load
loadUsers();
