
    
exports.postNeoHttp = function (path, inputData, callback) {


  let postData = JSON.stringify(inputData);

  console.log("postData:" + postData);

  let options = {
    host: neo_settings.server_domain,
    port: neo_settings.server_port,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  let req = http.request(options, res => {
      res.setEncoding('utf8');
      var returnData = "";

      res.on('data', chunk => {
          returnData = returnData + chunk;
      });

      res.on('end', () => {
        console.log(returnData);
        var result = JSON.parse(returnData);

        callback(result);

      });

  });
  req.write(postData);
  req.end();
}
    
    
    