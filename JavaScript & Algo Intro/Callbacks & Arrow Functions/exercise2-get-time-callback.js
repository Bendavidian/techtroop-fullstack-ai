const returnTime = function (time) {
  console.log('The current time is: ' + time)
}

function getTime(callback) {
  const time = new Date();
  callback(time);
}

getTime(returnTime);
