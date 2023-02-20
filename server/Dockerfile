FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source

COPY . /usr/src/app

EXPOSE 8080

# add port to environment variable
ENV PORT 8080

# add environment variable for database connection
ENV POSTGRES_HOST=157.245.68.252
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD="5'7sigma"
ENV JWT_TOKEN_SECRET="fivefootsevensigma!"

# start app
CMD [ "npm", "run", "start" ]