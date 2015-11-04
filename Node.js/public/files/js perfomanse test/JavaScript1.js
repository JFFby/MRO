var start = new Date();
var array = [];
for (var i = 0; i < 1000000; i++) {
    array[i] = Math.random(Math.round(Math.random() * 1000000));
}

_.sortBy(array);
var end = new Date();
console.log(end - start);

//result 3358 ms