let initData = {
}

const statusCode  = {
	SUCCESS: 0,
	NOT_LINKED: 1,
	INVALID_DATA: 2,
	CONNECTION_ERROR: 3
}

switch(testCase) {
	case "test.spec.js":
		console.log('init test.spec.js');
		initData.userName = "ben";
		initData.linked = true;
		initData.content = "video";
		initData.accessCode = "1234";
		initData.contentNumber = 1;
		initData.displayNumber = 1;
		initData.totalAvailableDisplayNumber = 10;
		initData.availableDisplay = [2, 3, 4, 5, 6, 7, 8 , 9, 10];
		break;
	case "test.unlinked.spec.js":
		console.log('init test.spec.js');
		initData.linked = false;
		initData.accessCode = "1234";
		break;
	default:
		break;
}