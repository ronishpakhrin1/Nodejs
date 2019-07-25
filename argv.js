var myArgs = process.argv.slice(2);
console.log(myArgs);
switch(myArgs[0]){
	case 'insult':
		console.log(myArgs[1],'not cool');
		break;
	case 'compliment':
		console.log(myArgs[1],'very cool');
		break;
	default:
		console.log('what?');
}
