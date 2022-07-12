FROM mongo:latest

COPY ./mongoDb/addAdminUser.js /data/addAdminUser.js