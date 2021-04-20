# Chat History Server (CHS)
CHS is the combination of a node.js application and a database.
It's main function is to persist conversation history in a Database, open sourced version provides example implementation for: MySQL, MSSQL and ORACLE.

- Node.js Server Requirements:  
  - Version: Node.js 14.X  
  - Minimum Hardware Requirements: 1 CPU Cores, 2 GB RAM, 10Gb Disk  
  - Recommended Hardware Requirements: 2 CPU Cores, 4 GB RAM, 10Gb Disk  
  - Operating Server: Independent  
  - Scaling: Horizontally scalable  
- Database Server Requirements
  - Version: latest stable release
  - Minimum Hardware Requirements: 2 CPU Cores, 2 GB RAM, 50Gb Disk
  - Recommended Hardware Requirements: 4 CPU Cores, 8 GB RAM, 200Gb Disk
  - Operating Server: Independent

## Installation instructions
These instructions use `docker` to build and run the CHS, however you may chose to use `podman` if required.
## Prerequisites

* Docker Container Runtime (https://www.docker.com/products/container-runtime)
* Docker Compose (https://docs.docker.com/compose/install/)
* `npm i -g nodemon`

## Configure the Database Instance
* Create a database called ServisbotChatHistory (this name can be chosen by the customer to follow their own conventions and standards).
* Run provided Database initialization script supplied in the `development/{YOUR_DB_FLAVOUR}` directory

## Build the CHS Docker Image
`cd servisbot-labs/sb-chat-history-server`  
`docker build -t servisbot/chat-history-server -f Dockerfile.{YOUR_DB_FLAVOUR} .`  

## Configure your Environment
```
LOG_LEVEL=debug
DB_HOST=foo.eu-west-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD="_"
DB_PORT=1521
DB_SID=ORCL
DB_CONNECTION_LIMIT=10
APP_VERSION=v1
DB_IMPLEMENTATION=ORACLE
```
Other examples of environment variables are available in `development/{YOUR_DB_FLAVOUR}` directory.

## Initiate the Container
`docker run -d -p "8080:8080" --name=sb-chs --env-file=chs.env servisbot/chat-history-server:<specific-version>`
Explanation:

- -d will run the CHS container as a daemon. Remove the -d flag to in your current terminal session.
- -p "8090:8080" will map port 8090 on the host machine to the port that the application is running on within the docker container. (The application runs on port 8080 within the CHS container)
- --name=sb-chs this will name your container, you may prefer to leave this blank.
- --env-file=chs.env will load the Environment Variables from the preconfigured file from the previous steps.  
Run `docker ps` to ensure the container is running. It is also possible to tail the logs via:
`docker logs -f sb-chs`

## Confirm Installation
Once you have the docker container running the main application, you can test the application/database configuration by running `sb-cli app chs-discover <ip/url>` command against that server.  
Note: The logged in user must have the IT role in their organization to have access to this command.  
e.g. `sb-cli app chs-discovery http://127.0.0.1:8080`
# Development

Artifacts are supplied in the `development` directory to enable development against a docker based MySQL or MsSQL database.

The recommended development path is to use a remote or containerized version of your choice of database.

To start up the conveniently supplied Database (skip this step if you have a local or RDS instance to point at)

* Open a new terminal
* `cd development/mysql` or `cd development/mssql`
* `docker-compose up --build -d`

NOTE : mysql is exposed on the host OS on port 3307 as OSX 3306 seems to be occupied 90% of the time

Start the app

* `npm run dev-mysql` or `npm run dev-mssql`


### Note about tables and database
The tableNames and Database name have been hard coded. The two table names are **Messages** and **Interactions**. The database has been hard coded to be **ServisbotChatHistory**


## Notes Regarding Supplied MySQL Container

* To connect to the mysql container - 
  * From an installed MySQL client - `mysql -u dev -p --protocol=tcp` (tcp is required when talking to docker)
  * From docker - `docker exec -it <CONTAINER_ID> /bin/bash`
  * Use MySQL Workbench

# Environment Variables

The following environment variables are required by the node.js application

```
export NODE_ENV=production
export LOG_LEVEL=debug
export DB_HOST=localhost
export DB_USER=dev
export DB_PASSWORD=supersecret
export DB_PORT=3306
export DB_CONNECTION_LIMIT=10
export APP_VERSION='v1'
export DB_IMPLEMENTATION=MYSQL
```

Optional `DB_DOMAIN` environment variable is supported to MSSQL running in AActive Directory Domain User authentication
Optional `DB_SID` environment variable is supported for Oracle

# Running the Node app as a container

If you want to test changes to the Dockerfile or the Node App within Docker
 
* `docker-compose -f development/mysql/docker-compose-combined.yaml up --build`
* `curl -v http://localhost:8080/v1/ping`

Or for MSSQL

* `docker-compose -f development/mssql/docker-compose-combined.yaml up --build`
* `curl -v http://localhost:8080/v1/ping`

# Using your own Database
You can use your own database with these steps:
1. Configure your database with required tables first.
2. Build the image for specific database implementation and run it using example env vars:
## MYSQL
database setup script: development/mysql/init_db.sql  
docker build -t chat-history-server -f Dockerfile.MYSQL .  
docker run -p 8080:8080 --rm -it --env-file=./development/mysql/sample.env chat-history-server:latest  
## MSSQL
database setup script: development/mssql/init_db.sql  
docker build -t chat-history-server -f Dockerfile.MSSQL .  
docker run -p 8080:8080 --rm -it --env-file=./development/mssql/sample.env chat-history-server:latest  
## ORACLE
database setup script: development/oracle/init_db.sql  
docker build -t chat-history-server -f Dockerfile.ORACLE .  
docker run -p 8080:8080 --rm -it --env-file=./development/oracle/sample.env chat-history-server:latest  
 
### Testing

Once you have the docker containter running the main application, you can test the application / database configuration by sending a GET request to the following url: `localhost:8080/v1/ping`

To do this, you can just run:

```bash
curl -v http://localhost:8080/v1/ping
```

If the response returns a 200 status code, then the application is ready for use. If using the `curl` command above, look for a line in the response that looks like this:

```bash
HTTP/1.1 200 OK
```

OR

`sb-cli app chs-discovery http://localhost:8080` #wow


You can use [ngrok](https://ngrok.com/) to test this locally. The address will look something like this `http://08bfde8b.ngrok.io`.
You need to update your organization configuration to get this working correctly. 
1. Config.remoteChatHistoryUrl set this to the address given by ngrok with /v1 at the end so in my example `http://08bfde8b.ngrok.io/v1`
2. Discovery.features.system.remoteChatHistory set this to true for the messages to make their way to the local server
3. Remote chat history need to be configured on the organization with a POST to `https://yuppnlw2kl.execute-api.eu-west-1.amazonaws.com/hedev/conversation/v1/org/flowit/chatHistory/Subscribe` with an empty body (note the organization in the path, the dev API gateway is shown here).



### Rerunning init.sql
In the event you need to modify the MySQL schema and need to run the `init.sql` script again, run the following command:
```bash 
docker-compose down -v
```
This will bring down your containers and remove the docker volumes, which will reinitialize your database the next time the containers are brought up.


### Swagger spec
Swagger spec is available at http://{YOUR_HOST}/swagger/api.yml

# Adding a new Database Engine

* Create a directory to contain PoolManager and Database in `src/lib`.  The name of the directory must match the name of the DB_IMPLEMENTATION ENV VAR value
  * The poolManager must expose a connect method the result of which is passed to the database class implementation.  The connect method is called at app startup
* Create query libs in `src/versions/v1`

