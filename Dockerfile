FROM node:10

# copy source files
RUN mkdir -p /usr/src
COPY ./package.json /usr/src

WORKDIR /usr/src
RUN npm install

COPY ./ /usr/src

CMD ["npm", "run",  "start"]