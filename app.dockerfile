FROM node:latest

COPY ./Api /home/node/project/Api
COPY ./Controller /home/node/project/Controller
COPY ./Db /home/node/project/Db
COPY ./Middleware /home/node/project/Middleware
COPY ./Validators /home/node/project/Validators
COPY ./app.js /home/node/project/app.js
COPY ./config.js /home/node/project/config.js
COPY ./package.json /home/node/project/package.json
COPY ./log-viewer-gui/public /home/node/project/log-viewer-gui/public
COPY ./log-viewer-gui/src /home/node/project/log-viewer-gui/src
COPY ./log-viewer-gui/package.json /home/node/project/log-viewer-gui/package.json