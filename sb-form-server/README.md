
# SB-FORM-SERVER

ServisBOT's form server is a small service allowing you to capture submissions for your form templates using [Form.io](https://github.com/formio/formio) and forward these submissions to a configured email address.

## Running
### Run with Docker
To run this service locally you can use [Docker](https://docs.docker.com/install/).
Make sure you have docker service installed and running.
Download and unzip or clone this repository `git clone { REPO }` to your machine.
Open terminal and navigate to the unzipped directory of this project. e.g. `cd $HOME/Downloads/sb-form-server`
build docker image by running  
`docker build -t sb-form-server .`

To run this container you will need:
- A directory with your [Form.io](https://github.com/formio/formio) forms templates.
  For now we can use testing form located in  
  `{SB-FORM-SERVER DIRECTORY}/test/fixtures/templates`  
  e.g. `$HOME/Downloads/sb-form-server/test/fixtures/templates`
- SMTP server or relay, you can get free account on multiple providers: ([sendgrid.com](sendgrid.com), [https://www.mailjet.com/](https://www.mailjet.com/) or [https://www.mailgun.com/](https://www.mailgun.com/))
- `.env` file with your email configuration.  You will find `.env-example` file in the `sb-form-server` directory rename it to `.env`, or just run  
`cp .env-example .env`
fill in your SMTP details.
```
PORT=3000
DEBUG=sb-form-server:*
NODE_ENV=production

MAIL_TO=YOUR_EMAIL_ADDRESS
MAIL_FROM=YOUR_EMAIL_ADDRESS
SMTP_HOST=smtp.host.domain
SMTP_PORT=587
SMTP_USER=USERNAME
SMTP_PASS=PASSWORD
```

Once you get all of the above you are ready to run the service:

```sh
docker run -p "3000:3000" \
-v $HOME/sb-form-server/test/fixtures/templates:/opt/sb-form-templates \
--env-file=.env \
--name=sb-form-server --rm sb-form-server:latest
```
you should see "sb-form-server:server Listening on port 3000" message in your terminal.

In your browser go to http://localhost:3000/forms/myform you should see the form, upon submission you will get an email if the details in the `.env` file are correct.


## Usage With ServisBOT
Note: In order to display forms to your servisBOT users, the service must serve via HTTPS.

Use the following markup to display the form:
<TimelineMessage>
  <DetailView
    title="My Form"
    description="Click Here to display MyForm"
    url="https://<your hostname/forms/<myform>"
    interactionType="event"
  />
</TimelineMessage>

If you are using Classic Flow, you should use a markupInteraction node. This will have three outputs:

1, Form Completed
2, Form Cancelled
3, User Freetyped before instead of displaying the form.
