let array= [1,0,0,0,1,1,1,0,0,1,0,1,0,1,1,0,0,0,1];
let integer =  "";
    array.forEach(element => {
        integer = integer+element;
    });
    integer = parseInt(integer, 2);
    let dbin = integer.toString(2);
    console.log(integer,dbin);