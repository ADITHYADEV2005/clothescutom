window.addEventListener('DOMContentLoaded', () => {
  fetch('/profile', {
    method: 'GET',
    credentials: 'include'  // send cookies
  })
  .then(res => {
    if (res.status === 401) {
      console.log('Please login');
      showLoginIcon();
    } else {
      return res.json();
    }
  })
  .then(data => {
    if (data && data.user) {
      console.log('Logged in user:', data.user);
      showProfileIcon(data.user);
    }
  })
  .catch(err => console.error(err));
});

// Dummy UI update functions — replace with your real UI code
function showLoginIcon() {
  // Example: show login button, hide profile icon
  const loginIcon = document.getElementById('login-icon');
  const profileIcon = document.getElementById('profile-icon');
  if (loginIcon) loginIcon.style.display = 'block';
  if (profileIcon) profileIcon.style.display = 'none';
}

function showProfileIcon(user) {
  // Example: hide login button, show profile icon with name/email
  const loginIcon = document.getElementById('login-icon');
  const profileIcon = document.getElementById('profile-icon');
  if (loginIcon) loginIcon.style.display = 'none';
  if (profileIcon) {
    profileIcon.style.display = 'block';
    profileIcon.textContent = user.name;  // or update innerHTML with more details
  }
}
