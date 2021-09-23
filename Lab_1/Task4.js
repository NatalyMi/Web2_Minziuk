var strStrings = ["He likes pizza", "I like pizza", "I like pizza", "She likes pizza"]

function DelTheSameStr (arrStr) {
    let tmp = []
    
    for (let index = 1, i = 0; index < arrStr.length; index++, i++) {
        
        if (arrStr[i] !== undefined)
            for (let j = index; j < arrStr.length; j++) {
              
                if (arrStr[j] !== undefined)
                if(arrStr[i].localeCompare(arrStr[j]) == 0)
                {
                    delete arrStr[j]
                }  
            } 
    }
  
};
DelTheSameStr(strStrings);
console.log(strStrings)
