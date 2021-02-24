FROM dpokidov:imagemagick
FROM node:lts

# Create app directory
RUN mkdir -p /opt/
COPY src /opt/src
COPY views /opt/views
COPY public /opt/public
COPY index.js package.json package-lock.json /opt/
WORKDIR /opt/
# Install app dependencies

RUN npm i -q --production

ENV NODE_ENV=production
CMD [ "npm", "start" ]