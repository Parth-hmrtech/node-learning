const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {

    fs.readFile('node-file.txt', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(data);
        return res.end();
    });
    
    // fs.writeFile('node-file.txt','I am method of writefile',(error)=>{
    //     if(error)throw error;
    //     console.log("File has been written");

    // })   
    
    // fs.writeFileSync('node-file.txt','I am method of writefileSynce',()=>{
    //     console.log("file has been writtten with writeFileSynce");

    // })
    
    fs.appendFile('node-file.txt', ' Appended text.', (err) => {
        if (err) throw err;
        console.log('Data has been appended');
    });

    // fs.rename('node-file.txt', 'newname.txt', (err) => {
    //   if (err) throw err;
    //   console.log('File has been renamed');
    // });

    // fs.readdir('node-folder', (err, files) => {
    //     if (err) throw err;
    //     console.log(files);
    // });
fs.stat('node-file.txt', (err, stats) => {
        if (err) throw err;
        console.log(stats);
    });
}).listen(3003);    
