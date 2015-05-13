var argv = require('yargs').argv,
    gulp = require('gulp'),
    gulpSCP = require('gulp-scp'),
    GulpSSH = require('gulp-ssh'),
    keyPath = '/Users/Apple/.ssh/id_rsa',
    exec = require('child_process').exec,    
    remoteHost = 'ip_address',
    username = 'user',
    port = 22,
    project_path = '/var/www/my_project',
    project_name = 'my_project',
    privateKey = '';

try {
  privateKey = require('fs').readFileSync(keyPath)
}
catch(e) {
  console.log("Key not found. Will continue normally but can't ssh if needed");
}

var branch = (argv.branch === undefined)?'master':argv.branch;

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
        host: remoteHost,
        port: port,
        username: username,
        privateKey: privateKey
    }
});

gulp.task('copy-creds',function(){
  return gulp.src('./index.js')
            .pipe(gulpSCP({
                host: remoteHost,
                user: username,
                port: port,
                path: project_path+'/creds/index.js'
            }));
});

gulp.task('copy-deployment-file', function(){
    return gulp.src('./deploy/build_env.sh')
        .pipe(gulpSCP({
            host: remoteHost,
            user: username,
            port: port,
            path: '/'+username
    }));
});

gulp.task('build-remote', ['copy-deployment-file'], function() {
   return gulpSSH.shell(['bash ./build_env.sh '+project_path +' '+branch]).pipe(gulp.dest('logs')); 
});


gulp.task('deploy',['copy-creds'], function() {

   return gulpSSH
    .shell([
      'cd '+project_path,
      'git checkout '+branch,
      'git pull origin '+branch + ' && npm install ',
      'pm2 restart -x server.js',
      'gulp build'
    ])
    .pipe(gulp.dest('logs'));
});



gulp.task('start-production', function(){
     gulp.start('build');
     exec('pm2 start -x ./server.js');
     //gulp.start('build');
});