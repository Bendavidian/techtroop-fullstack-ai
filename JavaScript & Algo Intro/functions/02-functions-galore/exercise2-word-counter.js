const story = "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately Shelob the wolf-master put the fire out with her feet, but until then, the fire caused one heck of a lot of damage.";

const specialChars = [",", ".", "'", '"', "?", "!", ";"];

const wordCounts = {};

function cleanText(sentence) {
  let cleaned = sentence.toLowerCase();
  for (let i = 0; i < specialChars.length; i++) {
    cleaned = cleaned.split(specialChars[i]).join(" ");
  }
  return cleaned.split(" ");
}

function addToCounter(word) {
  if (wordCounts[word]) {
    wordCounts[word]++;
  } else {
    wordCounts[word] = 1;
  }
}

function countWords(sentence) {
  const words = cleanText(sentence);
  for (let i = 0; i < words.length; i++) {
    addToCounter(words[i]);
  }
}

countWords(story);
console.log(wordCounts);
