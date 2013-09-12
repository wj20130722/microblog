/*var http = require('http');
var server = http.createServer(function(req, res){
	res.end(req.headers.host);
}).listen(8888);
*/
/*console.log = function(d){
	process.stdout.write(d + '\n');
};
console.log("__filename: " + __filename);
console.log("__dirname: " + __dirname);

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  process.stdout.write('data: ' + chunk);
});

process.stdin.on('end', function () {
  process.stdout.write('end');
});

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir('E:/hankewins');
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}
console.log(process.env);
*/
var dns = require('dns');

dns.resolve4('www.gionee.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function (a) {
    dns.reverse(a, function (err, domains) {
      if (err) {
        console.log('reverse for ' + a + ' failed: ' +
          err.message);
      } else {
        console.log('reverse for ' + a + ': ' +
          JSON.stringify(domains));
      }
    });
  });
});