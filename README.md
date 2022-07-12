# log-viewer
Collect and view logs.

## Develop notes:
- Error handling is not perfect. Error wrapper.
- Data validation is not implemented on all endpoints. It would be better to do it with schema validation with defined DTO.
- Front end input data validation on add user and add project.
- User auth is currently made with cookie session token, for systems to integrate would have to add bearer token (return jwt token on login and check in auth middleware).
- Add fuzzy search for log message.
- Socket.IO for auto refresh log data on new log message received.
- Missing .env to switch between dev and production environment.

## Run project
docker-compose up -d
Run ./mongoDb/addAdminUser.ps1

Login info:
username: admin
password: Admin123456!

## Add log:
POST method: /api/addLog <br />
body:  <br />
{ <br />
  "timestamp": "2022-06-16 12:50:23.9724", <br />
  "message": "Log message", <br />
  "severity_level": "debug",  - one of: "emerg", "alert", "crit", "err", "warning", "notice", "info", "debug" <br />
  "source": "Collector",  - collecting method - system, file, etc. <br />
  "project_short_name": "PROJ1" - Project needs to be in DB <br />
}