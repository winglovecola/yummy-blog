const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST'
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};


const dashboard = async () => {
  const response = await fetch('/dashboard', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to load dashboard.');
  }
};


document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#dashboard').addEventListener('click', dashboard);
