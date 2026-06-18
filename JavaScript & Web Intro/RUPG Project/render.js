function renderProfile(profile) {
  renderHeader(profile.mainUser);
  renderQuote(profile.quote);
  renderPokemon(profile.pokemon);
  renderAbout(profile.about);
  renderFriends(profile.friends);
}

function renderHeader(user) {
  const pic = document.getElementById('profile-picture');
  pic.src = user.picture;
  pic.alt = user.fullName;
  document.getElementById('profile-name').textContent = user.fullName;
  document.getElementById('profile-location').textContent = `${user.city}, ${user.location}`;
}

function renderQuote(quote) {
  document.getElementById('quote-text').textContent = `"${quote}"`;
  document.getElementById('quote-author').textContent = '— Kanye West';
}

function renderPokemon(pokemon) {
  const img = document.getElementById('pokemon-image');
  img.alt = pokemon.name;
  if (pokemon.image) {
    img.src = pokemon.image;
    img.classList.remove('hidden');
  } else {
    img.classList.add('hidden');
  }
  document.getElementById('pokemon-name').textContent = `Favorite Pokemon: ${pokemon.name}`;
}

function renderAbout(about) {
  document.getElementById('about-text').textContent = about;
}

function renderFriends(friends) {
  const list = document.getElementById('friends-list');
  list.innerHTML = '';
  friends.forEach(friend => {
    const li = document.createElement('li');
    li.textContent = friend.fullName;
    list.appendChild(li);
  });
}

function renderSavedDropdown(savedProfiles) {
  const select = document.getElementById('saved-users-select');
  select.innerHTML = '';

  const ids = Object.keys(savedProfiles);

  if (ids.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No saved users yet';
    select.appendChild(opt);
    return;
  }

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select a saved user…';
  select.appendChild(placeholder);

  ids.forEach(id => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = savedProfiles[id].mainUser.fullName;
    select.appendChild(opt);
  });
}

function renderLoading(isLoading) {
  document.getElementById('loading-overlay').classList.toggle('hidden', !isLoading);
}

function renderError(message) {
  const el = document.getElementById('error-message');
  if (message) {
    el.textContent = message;
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}
