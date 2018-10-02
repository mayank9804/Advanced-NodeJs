const fs = require('fs');
const path = require('path');
//Async readFile
// fs.readFile(path.join(__dirname,'sample.txt'),(err,data)=>{
//     if(!err){
//         console.log(data.toString());
//         console.log("\n");
//     }
// });


// Sync read File
// const data = fs.readFileSync(path.join(__dirname, 'sample.txt'));
// console.log(data);
// console.log("Async");




// const files = fs.readdirSync(path.join(__dirname));
// files.forEach(e => {
//     if (e.split('.')[1] === 'txt') {

//         fs.exists(path.join(__dirname, 'Sample'), exists => {
//             if (!exists) {
//                 fs.mkdir(path.join(__dirname, 'Sample'), (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                 })
//             }
//         })

//         fs.rename(path.join(__dirname, e), path.join(__dirname, 'Sample/sample.txt'), (err) => {
//             console.log("Done");
//         })
//     }

// })

const files = fs.readdirSync("C\:\\Users\\Mayank\\Desktop");
files.forEach(e=>{
    console.log(e);
})