FROM node:latest

RUN apt update
RUN apt install netcat-openbsd

RUN ["mkdir", "-p", "/usr/src/app"]
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn

ADD . /usr/src/app

EXPOSE 8888

ADD https://raw.githubusercontent.com/ufoscout/docker-compose-wait/1.0.0/wait.sh /wait.sh
RUN chmod +x /wait.sh
CMD /wait.sh && npm start
