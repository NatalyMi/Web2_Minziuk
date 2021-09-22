function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    return [ ...arr, ...left, ...right ]
}
function mergeSort(array) {
    const h = array.length / 2
    if(array.length < 2){
      return array 
    }
    
    const left = array.splice(0, h)
    return merge(mergeSort(left),mergeSort(array))
  }
  
  array = [5, 4, 7, 2, 10, 1, 3]

console.log(mergeSort(array))
