const logData = function (data) {
  console.log(data);
};

const displayData = function (alertDataFunc, logDataFunc, data) {
  alertDataFunc(data);
  logDataFunc(data);
};

displayData(console.error, logData, "I like to party")
