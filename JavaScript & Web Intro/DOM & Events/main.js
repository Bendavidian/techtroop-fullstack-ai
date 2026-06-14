// ====================================
// Exercise 1 - Ball Game
// ====================================

const ball  = document.getElementById('ball');
const field = document.getElementById('field');

let ballTop  = 50;
let ballLeft = 50;

ball.style.top  = ballTop  + 'px';
ball.style.left = ballLeft + 'px';

function moveBall(direction) {
  const STEP    = 15;
  const maxTop  = field.clientHeight - ball.offsetHeight;
  const maxLeft = field.clientWidth  - ball.offsetWidth;

  if (direction === 'up')    ballTop  = Math.max(0,       ballTop  - STEP);
  if (direction === 'down')  ballTop  = Math.min(maxTop,  ballTop  + STEP);
  if (direction === 'left')  ballLeft = Math.max(0,       ballLeft - STEP);
  if (direction === 'right') ballLeft = Math.min(maxLeft, ballLeft + STEP);

  ball.style.top  = ballTop  + 'px';
  ball.style.left = ballLeft + 'px';
}

document.getElementById('up').addEventListener('click',    function() { moveBall('up');    });
document.getElementById('down').addEventListener('click',  function() { moveBall('down');  });
document.getElementById('left').addEventListener('click',  function() { moveBall('left');  });
document.getElementById('right').addEventListener('click', function() { moveBall('right'); });

// Extension 3 - Keyboard support
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp')    { e.preventDefault(); moveBall('up');    }
  if (e.key === 'ArrowDown')  { e.preventDefault(); moveBall('down');  }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); moveBall('left');  }
  if (e.key === 'ArrowRight') { e.preventDefault(); moveBall('right'); }
});


// ====================================
// Exercise 2 - Reservations
// ====================================

const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
};

function checkReservation() {
  const name   = document.getElementById('nameInput').value;
  const result = document.getElementById('reservationResult');

  if (reservations[name] === undefined) {
    result.textContent  = 'You have no reservation';
    result.style.color  = '#e74c3c';
  } else if (reservations[name].claimed) {
    result.textContent  = 'Hmm, someone already claimed this reservation';
    result.style.color  = '#e67e22';
  } else {
    result.textContent  = 'Welcome, ' + name;
    result.style.color  = '#27ae60';
  }
}


// ====================================
// Exercise 3 - Visual Overload
// ====================================

const container = document.getElementById('container');
const NUM_BOXES = 20;

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

// Generate boxes with JavaScript
for (var i = 0; i < NUM_BOXES; i++) {
  var box = document.createElement('div');
  box.className = 'box';
  box.onmouseenter = function() {
    this.style.backgroundColor = randomColor();
    checkAllSameColor();
  };
  container.appendChild(box);
}

// Extension 2 - "Make all boxes same color" button
var sameColorBtn = document.createElement('button');
sameColorBtn.id          = 'sameColorBtn';
sameColorBtn.type        = 'button';
sameColorBtn.textContent = 'Make all boxes same color';
sameColorBtn.style.marginBottom = '12px';
sameColorBtn.addEventListener('click', function() {
  var color = randomColor();
  document.querySelectorAll('.box').forEach(function(b) {
    b.style.backgroundColor = color;
  });
  checkAllSameColor();
});

// Extension 2 - "Nice job!" message
var niceJobMsg = document.createElement('p');
niceJobMsg.id                = 'niceJob';
niceJobMsg.textContent       = 'Nice job!';
niceJobMsg.style.display     = 'none';
niceJobMsg.style.fontWeight  = 'bold';
niceJobMsg.style.fontSize    = '20px';
niceJobMsg.style.color       = '#27ae60';
niceJobMsg.style.marginTop   = '8px';

var exercise3 = document.getElementById('exercise3');
exercise3.appendChild(sameColorBtn);
exercise3.appendChild(niceJobMsg);

function checkAllSameColor() {
  var boxes  = document.querySelectorAll('.box');
  var colors = Array.from(boxes).map(function(b) { return b.style.backgroundColor; });
  var allSet  = colors.every(function(c) { return c !== ''; });
  var allSame = allSet && colors.every(function(c) { return c === colors[0]; });
  niceJobMsg.style.display = allSame ? 'block' : 'none';
}


// ====================================
// Exercise 4 - Form
// ====================================

function validate() {
  var errorsDiv = document.getElementById('errors');
  errorsDiv.innerHTML = ''; // Clear old errors

  var name     = document.getElementById('nameField').value.trim();
  var salary   = parseInt(document.getElementById('salaryField').value);
  var birthday = document.getElementById('birthdayField').value;
  var phone    = document.getElementById('phoneField').value.trim();

  var errors = [];

  if (name.length <= 2) {
    errors.push('name is missing');
  }
  if (!salary || salary <= 10000 || salary >= 16000) {
    errors.push('salary must be greater than 10,000 and less than 16,000');
  }
  if (!birthday) {
    errors.push('birthday is missing');
  }
  if (!/^\d{10}$/.test(phone)) {
    errors.push('phone must be 10 digits long');
  }

  if (errors.length > 0) {
    errors.forEach(function(err) {
      var p = document.createElement('p');
      p.textContent   = err;
      p.style.color   = 'red';
      p.style.margin  = '4px 0';
      errorsDiv.appendChild(p);
    });
    return;
  }

  // Extension 1 - All valid: hide form, show welcome message
  document.getElementById('signupForm').style.display = 'none';
  var welcomeMsg = document.getElementById('welcomeMsg');
  welcomeMsg.textContent = 'Welcome, ' + name;
}
