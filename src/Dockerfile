FROM node:20-alpine3.18

WORKDIR /mtx_demo

# Install Bash
RUN apk add --no-cache bash

COPY ./package.json /mtx_demo
COPY ./package-lock.json /mtx_demo

RUN npm install

COPY ./ /mtx_demo

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "run", "dev" ]