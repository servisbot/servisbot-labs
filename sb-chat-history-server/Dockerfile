FROM node:10.16.3-alpine

# Create app directory
RUN mkdir -p /opt/
COPY src /opt/src
COPY swagger /opt/swagger

COPY index.js package.json LICENSE package-lock.json /opt/
WORKDIR /opt/

# Install app dependencies
RUN npm i -q --production

ENV NODE_ENV=production

CMD [ "npm", "start" ]