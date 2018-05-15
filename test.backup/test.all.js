var mockHttp = require('./mockHttp.js')
var lambda = require('../lambda/custom/index.js')
var context = require('./context.js')
var mockContext = new context()

var expect  = require('chai').expect;


function callback(error, data) {
    if(error) {
        console.log('error: ', error)
    }
    else {
        console.log(data)
    }
}

it('Main page content', function(done) {
  var mockEvent = require('./start.json')
  lambda.handler(mockEvent, mockContext, callback);
  expect(body).to.equal('Hello World');
  done();
});
