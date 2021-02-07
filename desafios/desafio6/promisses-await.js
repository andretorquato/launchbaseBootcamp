async function printDouble(number, sum) {
  let result =  new Promise(function (resolve, reject) {
    setTimeout(() => {
        
      resolve((number * 2) + sum);
    }, Math.floor(Math.random() * 100) + 1);
  });

  result.then(function (value){
        console.log(value);
        sum = value;
        
        
  });
  return result;
}


async function printAll() {
  let result = await printDouble(5, 0);
  result = await printDouble(12, result);
  result = await printDouble(2, result);
}

printAll();
