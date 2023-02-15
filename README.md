# Bookstore App
This is a sample bookstore app built with Node.js and MySQL. It includes three microservices for managing users, books, and reviews. The frontend service allows users to browse for books, and also includes a feature for see and adding reviews. The app is also configured to use Nginx as a reverse proxy and Portainer for container management.

## Dependencies
- Docker
- Docker Compose

## Running the App
1. Clone the repository: git clone https://github.com/ernesqba/bookstore-app.git
2. Navigate to the project root: cd bookstore-app
3. Start the app: docker-compose up
4. Open the app in your browser: http://localhost:85


## Services
### Frontend Service
The frontend service is responsible for serving the web interface of the bookstore app. It is built with Node.js and runs on port 4000. It communicates with the other microservices through HTTP requests. The following environment variables are available for configuring the service:

* PORT: the port the service runs on (default: 4000)
* SECRET: the secret used for session-based authentication (default: my-secret)
* USERS_URL: the URL of the users service (default: http://users-service:3000)
* BOOKS_URL: the URL of the books service (default: http://books-service:3001)
* REVIEWS_URL: the URL of the reviews service (default: http://reviews-service:3002)

### Users Service
The users service is responsible for managing user accounts in the bookstore app. It is built with Node.js and runs on port 3000. It communicates with the MySQL database for storing user data. The following environment variables are available for configuring the service:

* PORT: the port the service runs on (default: 3000)
* DB_HOST: the hostname of the MySQL database (default: db)
* DB_USER: the MySQL database username (default: root)
* DB_PASSWORD: the MySQL database password (default: root)
* DB_NAME: the name of the MySQL database (default: books_db)

### Books Service
The books service is responsible for managing books in the bookstore app. It is built with Node.js and runs on port 3001. It communicates with the MySQL database for storing book data. The following environment variables are available for configuring the service:

* PORT: the port the service runs on (default: 3001)
* DB_HOST: the hostname of the MySQL database (default: db)
* DB_USER: the MySQL database username (default: root)
* DB_PASSWORD: the MySQL database password (default: root)
* DB_NAME: the name of the MySQL database (default: books_db)

### Reviews Service
The reviews service is responsible for managing book reviews in the bookstore app. It is built with Node.js and runs on port 3002. It communicates with the MySQL database for storing review data. The following environment variables are available for configuring the service:

* PORT: the port the service runs on (default: 3002)
* DB_HOST: the hostname of the MySQL database (default: db)
* DB_USER: the MySQL database username (default: root)
* DB_PASSWORD: the MySQL database password (default: root)
* DB_NAME: the name of the MySQL database (default: books_db)

### Database Service
The database service is responsible for running a MySQL instance for the bookstore app. It runs on port 3306 and is exposed on port 3310 for accessing the database from outside the Docker

## Container Management with Portainer
Portainer is a web-based container management tool that makes it easy to manage your Docker environments. It runs on port 9000 and can be accessed in your browser at http://localhost:9000. You will be prompted to set up an admin user and password the first time you access Portainer.

## Conclusion
The bookstore app is a sample application that showcases how to build a multi-service Node.js application with a MySQL database. With Docker Compose, it is easy to start up and manage the app, along with other useful tools like Nginx and Portainer.