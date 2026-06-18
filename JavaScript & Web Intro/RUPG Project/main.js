async function generateUser() {
  renderError(null);
  renderLoading(true);
  try {
    const profile = await fetchAllData();
    state.currentProfile = profile;
    renderProfile(profile);
  } catch {
    renderError('Something went wrong fetching data. Please check your connection and try again.');
  } finally {
    renderLoading(false);
  }
}

function saveUser() {
  if (!state.currentProfile) {
    renderError('Generate a user first before saving.');
    return;
  }
  saveCurrentProfile();
  renderSavedDropdown(state.savedProfiles);
  renderError(null);
}

function loadUser() {
  const select = document.getElementById('saved-users-select');
  const id = select.value;

  if (!id) {
    renderError('Select a saved user from the dropdown first.');
    return;
  }

  const profile = loadProfileById(id);
  if (!profile) {
    renderError('Could not find that saved user.');
    return;
  }

  state.currentProfile = profile;
  renderProfile(profile);
  renderError(null);
}

function init() {
  document.getElementById('generate-btn').addEventListener('click', generateUser);
  document.getElementById('save-btn').addEventListener('click', saveUser);
  document.getElementById('load-btn').addEventListener('click', loadUser);

  renderSavedDropdown(state.savedProfiles);
  generateUser();
}

init();
