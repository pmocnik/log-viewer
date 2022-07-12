db = connect( 'mongodb://localhost:27017/log-viewer' );
db.users.insertMany( [
   {
      name: 'Admin',
      surname: 'Admin',
      username: 'admin',
      password: '$2b$10$WA56Or3DbKw2Jm/sRQ0G9ex4/zRQexJesmUWwgMhz0f63LxHprEES',
      email: 'admin@test.si',
      roles: [ 'Admin', 'User' ]
   }
])