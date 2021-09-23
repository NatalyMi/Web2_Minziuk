const arrWords = ['mama', 'likes', 'cooking']
console.log(WordsToString(arrWords))
function WordsToString (words) {
  let str = ''
  for (let index = 0; index < words.length; index++) {
    str += words[index]
  }
  return str
}
