function Fibonacci (num) {
    var num1 = 0
    var num2 = 1
    var sum = 0;
    if(num > 0)
    console.log(num1)
    if(num > 1)
    console.log(num2)
    if(num>2)
    for (let index = 0; index < num-2; index++) {
       sum = num1 + num2
       num1 = num2
       num2 = sum
        console.log(num2)
    }
}

Fibonacci(4)
