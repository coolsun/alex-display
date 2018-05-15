// No use it returns 
//let myArgs = process.argv;

const statusCode  = {
	SUCCESS: 0,
	NOT_LINKED: -1,
	INVALID_DATA: -2,
	CONNECTION_ERROR: -3
}

exports.postNeoHttp = function (path, inputData, callback) {

  console.log(`mock postNeoHttp: path`);
  console.log(`mock inputData: ${JSON.stringify(inputData)}`);


  // input logic
  // return data
  let returnData = {};
  let statusMessage = '';
  switch(path) {
	case "/start":
		if (inputData.neoTestInitData.linked == true) {
			returnData.linked = true;
			returnData.status = "success";
			returnData.statusMessage = statusMessage;
			returnData.statusCode = statusCode.SUCCESS;
		}
		else {
			returnData.linked = false;
			returnData.status = "success";
			returnData.statusMessage = statusMessage;
			returnData.statusCode = statusCode.SUCCESS;
		}
		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
	case "/link":
		if (inputData.neoTestInitData.linked == true) {
			console.log("link true");
			returnData.linked = true;
			returnData.status = "success";
			returnData.statusMessage = statusMessage;
			returnData.statusCode = statusCode.SUCCESS;
		}
		else {
			if (inputData.neoData.accessCode == inputData.neoTestInitData.accessCode) {
				console.log("link false ==: inputData.neoData.accessCode " + inputData.neoData.accessCode);
				console.log("link false ==: inputData.neoTestInitData.accessCode " + inputData.neoTestInitData.accessCode);
				returnData.linked = true;
				returnData.status = "success";
				returnData.statusMessage = statusMessage;
				returnData.statusCode = statusCode.SUCCESS;
			}
			else {
				console.log("link false !=: inputData.neoData.accessCode" + inputData.neoData.accessCode);
				console.log("link false !=: inputData.neoTestInitData.accessCode" + inputData.neoTestInitData.accessCode);
				returnData.linked = false;
				returnData.status = "error";
				returnData.statusMessage = "access code is invalid";		
				returnData.statusCode = statusCode.INVALID_DATA;
			}
		}
		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
	case "/command":
		if (inputData.neoTestInitData.linked !== undefined &&
			inputData.neoTestInitData.linked == true) {
			switch (inputData.neoData.command) {
				case "restart":
				case "start":
				case  "stop":
				case  "forward":
				case  "backward":
				case  "pause":
					statusMessage = `Play ${inputData.neoData.command} ${inputData.neoData.content} ${inputData.neoData.number} successfully.`;
					console.log(statusMessage);
					returnData.linked = true;
					returnData.command = inputData.neoData.command;
					returnData.content = inputData.neoData.content;
					returnData.number = inputData.neoData.number;
					returnData.status = "success";
					returnData.statusMessage = statusMessage;
					returnData.statusCode = statusCode.SUCCESS;
					break;
				default:
					statusMessage = `${inputData.neoData.command} is unknown`;
					console.log(statusMessage);
					returnData.linked = true;
					returnData.command = inputData.neoData.command;
					returnData.content = inputData.neoData.content;
					returnData.number = inputData.neoData.number;
					returnData.status = "error";
					returnData.statusMessage = statusMessage;
					returnData.statusCode = statusCode.INVALID_DATA;
			}
		}
		else {
			returnData.linked = false;
			returnData.command = inputData.neoData.command;
			returnData.content = inputData.neoData.content;
			returnData.number = inputData.neoData.number;
			returnData.status = "error";
			statusMessage = 'your account is not linked'
			returnData.statusMessage = statusMessage;
			returnData.statusCode = statusCode.NOT_LINKED;
		}
		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
	case "/select":
		if (inputData.neoTestInitData.linked == true) {
			returnData.status = "success";
			returnData.content = inputData.neoData.content;
			returnData.number = inputData.neoData.number;
			returnData.statusMessage = `Select ${inputData.neoData.content} ${inputData.neoData.contentNumber} successfully.`;
			returnData.statusCode = statusCode.SUCCESS;
		}
		else {
			returnData.status = "error";
			returnData.content = inputData.neoData.content;
			returnData.number = inputData.neoData.number;
			returnData.statusMessage = "your account is not linked";
			returnData.statusCode = statusCode.NOT_LINKED;
		}

		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
	case "/report":
		if (inputData.neoTestInitData.linked == true) {
			returnData.status = "success";
			returnData.content = inputData.neoData.content;
			returnData.number = inputData.neoData.number;
			returnData.statusMessage = `Report ${inputData.neoData.content} ${inputData.neoData.number} successfully.`;
			returnData.statusCode = statusCode.SUCCESS;
		}
		else {
			returnData.status = "error";
			returnData.content = inputData.neoData.content;
			returnData.number = inputData.neoData.number;
			returnData.statusMessage = "your account is not linked";
			returnData.statusCode = statusCode.NOT_LINKED;
		}

		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;	
	case "/end":
		if (inputData.neoTestInitData.linked == true) {
			// end the game, or stop the content
			returnData.status = "success";
			returnData.statusMessage = "Stop playing content or game.";
			returnData.statusCode = statusCode.SUCCESS;
		}
		else {
			returnData.status = "success";
			returnData.statusMessage = "ignored";
			returnData.statusCode = statusCode.SUCCESS;
		}
		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
	default:
		returnData.status = "error";
		returnData.statusMessage = "Api call has failed.  Please try again later";
		returnData.statusCode = statusCode.CONNECTION_ERROR;
		console.log('returnData:'+JSON.stringify(returnData));
		callback(returnData);
		break;
  }

}

