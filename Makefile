all:
	sed -i '' 's/fonts/font/g' css/bootstrap.min.css

	java -jar yuicompressor-2.4.8.jar js/AMI/AMILogin.js -o js/AMI/AMILogin.min.js
	java -jar yuicompressor-2.4.8.jar js/AMI/AMIWebApp.js -o js/AMI/AMIWebApp.min.js
	java -jar yuicompressor-2.4.8.jar js/AMI/AMICommand.js -o js/AMI/AMICommand.min.js
