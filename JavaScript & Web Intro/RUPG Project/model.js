const state = {
  currentProfile: null,
  savedProfiles: loadSavedProfiles()
};

function loadSavedProfiles() {
  try {
    return JSON.parse(localStorage.getItem('rupg_profiles')) || {};
  } catch {
    return {};
  }
}

function persistProfiles() {
  localStorage.setItem('rupg_profiles', JSON.stringify(state.savedProfiles));
}

function saveCurrentProfile() {
  if (!state.currentProfile) return false;
  state.savedProfiles[state.currentProfile.id] = state.currentProfile;
  persistProfiles();
  return true;
}

function loadProfileById(id) {
  return state.savedProfiles[id] || null;
}

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?results=7');
  if (!res.ok) throw new Error('Could not load users');
  const data = await res.json();
  return data.results;
}

async function fetchQuote() {
  const res = await fetch('https://api.kanye.rest/');
  if (!res.ok) throw new Error('Could not load quote');
  const data = await res.json();
  return data.quote;
}

async function fetchPokemon() {
  const id = Math.floor(Math.random() * 1025) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Could not load pokemon');
  const data = await res.json();
  const image =
    data.sprites.front_default ||
    data.sprites.other?.['official-artwork']?.front_default ||
    '';
  return { name: toProperCase(data.name), image };
}

async function fetchAbout() {
  const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=json');
  if (!res.ok) throw new Error('Could not load about text');
  const data = await res.json();
  return data[0];
}

function toProperCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildProfile(users, quote, pokemon, about) {
  const main = users[0];
  return {
    id: Date.now(),
    mainUser: {
      firstName: main.name.first,
      lastName: main.name.last,
      fullName: `${main.name.first} ${main.name.last}`,
      city: main.location.city,
      location: main.location.state || main.location.country,
      picture: main.picture.large
    },
    quote,
    pokemon,
    about,
    friends: users.slice(1).map(u => ({
      firstName: u.name.first,
      lastName: u.name.last,
      fullName: `${u.name.first} ${u.name.last}`
    })),
    createdAt: new Date().toISOString()
  };
}

async function fetchAllData() {
  const [users, quote, pokemon, about] = await Promise.all([
    fetchUsers(),
    fetchQuote(),
    fetchPokemon(),
    fetchAbout()
  ]);
  return buildProfile(users, quote, pokemon, about);
}
