# Chat app built with backbone.js

### Reason for this repository

I want to learn backbone.js but need to set up a simple back end first (and do not want to use localStorage adapter)

### Get it running:

1. Download/Install

`git clone https://github.com/GCDeveloper/backbone-chat-app`

`cd backbone-chat-app && npm install`

`npm install copyfiles -g`

`npm install rimraf -g`

`npm install browserify -g`

2. Build

`npm run build`

3. Start

`npm start`

It should now be listening on port 3000

### Todo:

* Use web sockets e.g. socket.io so it is easy to determine if there are new messages which should be broadcast, rather than polling the server.

* Implement front end using Backbone.js

* Move global deps (described above) into devDependencies

* Improve build/dev tools
