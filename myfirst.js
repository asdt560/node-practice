const http = require('http');
const fs = require('fs')
const formidable = require('formidable');
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  let filename = `.${req.url}`
  if (req.method.toLowerCase() === 'post') {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }
      console.log(files)
      const oldpath = files.multipleFiles.filepath;
      const newpath = 'C:/Users/Justo/github/node-practice/filestorage/' + files.multipleFiles.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
      //res.writeHead(200, { 'Content-Type': 'application/json' });
      //res.end(JSON.stringify({ fields, files }, null, 2));
    });
    return;
  } else {
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});