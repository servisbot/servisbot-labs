
# SB-FORM-SERVER

Is a service hosting [Form.io](https://github.com/formio/formio) forms, it emails submissions to pre-configured email address.

It was built to be used in a ServisBOT's conversational bots - you can use <DetailView> Markup to display your form, have user fill it in and upon submission it will be sent to your chosen email.

## Prerequisites

* Docker Container Runtime (https://www.docker.com/products/container-runtime)
* SMTP Server or Relay configuration - host, port, username and password.  
  Search for "Free SMTP relay" to get number of providers, many offer free accounts.


## Run with Docker
* Make sure you have docker service installed and running.
* Download and unzip this project to directory on your machine.
* Open terminal and navigate to the unzipped directory of this project.   
  `cd $HOME/Downloads/servisbot-labs/sb-form-server`
* open `.env-example` file with text editor and fill in your details
  ```sh
    PORT=3000
    DEBUG=sb-form-server:*
    NODE_ENV=production

    MAIL_TO=YOUR_EMAIL_ADDRESS
    MAIL_FROM=YOUR_EMAIL_ADDRESS
    SMTP_HOST=YOUR_SMTP_HOST
    SMTP_PORT=YOUR_SMTP_PORT
    SMTP_USER=YOUR_SMTP_USERNAME
    SMTP_PASS=YOUR_SMTP_PASSWORD
  ```
* build docker image by typing following in your terminal
  ```sh
  docker build -t sb-form-server .
  ```
* Copy paste following into your terminal
  ```sh
  docker run -p "3000:3000" \
  -v /test/fixtures/templates:/opt/sb-form-templates \
  --env-file=.env-example \
  --name=sb-form-server sb-form-server:latest \
  --rm
  ```
  You may get a docker error about the path not being shared, followed the instructions in the error log to be able to mount that directory.

When you complete all steps above and the container runs you should see "sb-form-server:server Listening on port 3000" message in your terminal.

In your browser go to http://localhost:3000/forms/myform you should see the form, upon submission you will get an email if the details in the `.env` file are correct.

## Using your own forms
* Make sure you have a directory with form definitions on your local machine
* Add this directory to shared files in docker settings
* Replace YOUR_FORMS_DEFINITIONS_DIR in the following and run this command terminal
```
docker run -p "3000:3000" \
  -v YOUR_FORMS_DEFINITIONS_DIR:/opt/sb-form-templates \
  --env-file=.env-example \
  --name=sb-form-server sb-form-server:latest \
  --rm
```
In your browser navigate to http://localhost:3000/forms/{FILE_NAME_OF_YOUR_FORM}

 


