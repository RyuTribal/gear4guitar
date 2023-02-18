FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source

COPY . /usr/src/app

EXPOSE 3000

# add port to environment variable
ENV PORT 3000

# add environment variable for database connection
ENV POSTGRES_HOST=<your host>
ENV POSTGRES_PORT=<your port>
ENV POSTGRES_USER=<your user>
ENV POSTGRES_PASSWORD=<your password>
ENV JWT_TOKEN_SECRET=<your jwt secret>

# start app
CMD [ "npm", "start" ]