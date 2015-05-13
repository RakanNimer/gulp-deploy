# gulp-deploy
Deploy client and server-side code with Gulp

Gulp file to build an environment and deploy code on remote environments.

## Usage

```
	npm install
```

Change the following variables in gulpfile.js

```javascript
	remoteHost = 'ip_address',
    username = 'user',
    project_path = '/var/www/my_project',
    keyPath = '/Users/Apple/.ssh/id_rsa',
```

Edit ``` deploy/build_env.sh ``` for customizing environment

#### Build environment and deploy code on empty Ubuntu 14.04 

```
	gulp build-remote --branch my_branch
```

If no branch argument is provided the master branch will be used

#### Deploy new commit to server

```
	gulp deploy --branch my_branch
```
