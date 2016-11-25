/**
 * Created by spray on 16-8-23.
 */

var plan = require('flightplan');

var appName = 'www.wangyn.net-node';
var username = 'spray';
var startFile = 'bin/www';
//var npmDir = '/home/spray/.nvm/versions/node/v6.4.0/bin/npm';


// configuration

// plan.target('staging', [
//     {
//         host: '104.131.93.214',
//         username: username,
//         agent: process.env.SSH_AUTH_SOCK
//     }
// ]);

plan.target('production', [
    {
        host: '45.32.130.142',
        username: username,
        agent: process.env.SSH_AUTH_SOCK
    }
]);

plan.local(function (local) {
    local.exec('git add --all');
    local.exec('git commit -m "modify README.md"');
    local.exec('git push');
});

plan.remote(function(remote) {
    remote.sudo('pm2 stop 0', {user:username});
    remote.sudo('rm -rf /home/spray/www.wangyn.net-node',{user:username});
});

// run commands on localhost
plan.local(function(local) {
    // uncomment these if you need to run a build on your machine first
    // local.log('Run build');
    // local.exec('gulp build');

    local.log('Copy files to remote hosts');
    var filesToCopy = local.exec('git ls-files', {silent: true});
    // rsync files to all the destination's hosts
    local.transfer(filesToCopy, '/home/spray/' + appName);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {

    remote.log('Install dependencies');
    remote.sudo('cd /home/spray/' + appName+'/;npm install',{user:username});
    //remote.sudo('npm install',{user:username});  // /home/spray/.nvm/versions/node/v6.4.0/bin/npm
    //remote.exec('npm install forever -g');

    remote.log('Reload application');
    //remote.exec('forever stop /home/spray/'+appName+'/'+startFile, {failsafe: true});
    remote.sudo('pm2 start 0',{user:username});
});

