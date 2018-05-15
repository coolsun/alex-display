let myArgs = process.argv;

let returnData = {
}

let testCase = myArgs[1] + ":" + myArgs[2];
switch(testCase) {
	case "test.start.js:linked":
		returnData.status = "linked";
		break;
	case "test.start.js:unlinked":
		returnData.status = "unlinked";
		break;
	default:
		break;
}

function postNeoHttp(path, inputData, callback) {

  let postData = JSON.stringify(inputData);

  console.log("postNeoHttp:"+path);
  console.log("postData:" + postData);


  // input logic
  // return data

  switch(path) {
		case "/start":
  		let result = JSON.parse(returnData);
  		callback(result);
			break;
		case "/link":
  		let result = JSON.parse(returnData);
  		callback(result);
			break;
		case "/command":
  		let result = JSON.parse(returnData);
  		callback(result);
			break;
		case "/end":
  		let result = JSON.parse(returnData);
  		callback(result);
			break;
    default:
  		let result = JSON.parse(returnData);
  		callback(result);
			break;
  }

}

