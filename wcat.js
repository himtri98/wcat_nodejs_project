let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let optionArr = []; // separate - part and
let filesArr = []; // path part

for(let i=0;i<inputArr.length;i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }
    else {
        filesArr.push(inputArr[i]);
    }
}
//console.log(optionArr);
//console.log(filesArr);
// to check whether file exists or not
for(let i=0; i<filesArr.length;i++)
{
    let filePath = filesArr[i];
    if(fs.existsSync(filePath) == false)
    {
        console.log("file does not exist");
        return;
    }
}
// storing all the contents of files
let content = "";
for(let i=0; i<filesArr.length;i++){
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
 let newArr = content.split("\r\n");

 if(optionArr.includes("-s")){
    for(let i=1;i<newArr.length;i++)
    {
        if(newArr[i] == "" && newArr[i-1]=="")
        {
            newArr[i] = null;
        }
        else if(newArr[i] == "" && newArr[i-1] == null)
        {
            newArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0 ; i<newArr.length;i++)
    {
        if(newArr[i] != null)
        {
            tempArr.push(newArr[i]);
        }
    }
    newArr = tempArr;
 }
 // this is to check whether both -n and -b present or not
let check = 0;
if(optionArr.includes("-n")&&optionArr.includes("-b")){
    if(optionArr.indexOf("-b") > optionArr.indexOf("-n")){
        check =1;
    }
    else{
        check = 2;
    }
}

// for -n
if(optionArr.includes("-n") && (check == 1 || check ==0)){
    for(let i=0 ; i<newArr.length;i++)
    {
        newArr[i] =(i+1 + "  " + newArr[i]);
    }
}

// for -b
if(optionArr.includes("-b") && (check == 2 || check == 0)){
    counter =1;
    for(let i=0;i<newArr.length;i++)
    {
        if(newArr[i] != ""){
            newArr[i] = (counter + "  " + newArr[i]);
            counter++;
        }
    }
}

// at last join the array
console.log(newArr.join("\n"));