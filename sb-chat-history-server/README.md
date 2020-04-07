# Chat History Server (CHS)

API to persist conversation history in a MySQL or MsSQL Database

## Prerequisites

* Docker Container Runtime (https://www.docker.com/products/container-runtime)
* Docker Compose (https://docs.docker.com/compose/install/)
* `npm i -g nodemon`

# Development

Artifacts are supplied in the `development` directory to enable development against a docker based MySQL or MsSQL database.

The recommended development path is to use a remote or containerised version of MySQL or MSSQL.

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

# Running the Node app as a container

If you want to test changes to the Dockerfile or the Node App within Docker
 
* `docker-compose -f development/mysql/docker-compose-combined.yaml up --build`
* `curl -v http://localhost:8080/v1/ping`

Or for MSSQL

* `docker-compose -f development/mssql/docker-compose-combined.yaml up --build`
* `curl -v http://localhost:8080/v1/ping`


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

