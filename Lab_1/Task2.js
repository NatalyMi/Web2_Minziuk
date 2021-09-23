const str = 'I like pizza'
console.log(ToUpperFirst(str))
function ToUpperFirst (words) {
  let tmp = ''
  const split = words.split(' ')
  for (let index = 0; index < split.length; index++) {
    tmp += split[index].charAt(0).toUpperCase() + split[index].slice(1) + ' '
  }
  return tmp
}
