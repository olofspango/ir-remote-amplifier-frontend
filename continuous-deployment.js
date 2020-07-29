var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

const PM2_PROJECT_NAME = "remote-frontend"
const PM2_CONT_DEPLOY_NAME = "Cont-Deploy"
const PROJECT_PATH = "~/ir-remote-amplifier-frontend/"
const REPOSITORY_FULLNAME = process.env.REMOTE_FRONTEND_REPOSITORY_NAME

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/payload', function (req, res) {
    res.sendStatus(200);
	console.log('get /payload');
});

app.post('/payload', function (req, res) {
	//verify that the payload is a push from the correct repo
	//verify repository.name == 'wackcoon-device' or repository.full_name = 'DanielEgan/wackcoon-device'
	if(!(req.body.repository.full_name === REPOSITORY_FULLNAME)) {
		res.status(403).send("Wrong repo.");
		return;
	}
	

	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);

	console.log('pulling code from GitHub...');

	// reset any changes that have been made locally
	exec(`git -C ${PROJECT_PATH} reset --hard`, execCallback);

	// and ditch any files that have been added locally too
	exec(`git -C ${PROJECT_PATH} clean -df`, execCallback);

	// now pull down the latest
	exec(`git -C ${PROJECT_PATH} pull -f`, execCallback);

	// and npm install with --production
	exec(`npm -C ${PROJECT_PATH} install --production`, execCallback);

	// and run tsc
	exec(`pm2 restart ${PM2_PROJECT_NAME}`, execCallback);
	res.send("OK!")
	exec(`pm2 restart ${PM2_CONT_DEPLOY_NAME}`, execCallback)
});

app.listen(5000, function () {
	console.log('listening on port 5000')
});

function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}
