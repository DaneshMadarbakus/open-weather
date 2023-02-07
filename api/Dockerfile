# docker volume create shared-stuff 
# docker build -t daneshm/weatherapi:1.0 . 
# docker run daneshm/weatherapi:1.0 


FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV WEB_PORT=8080
ENV WEB_HOST=db

EXPOSE 8080

CMD [ "npm", "start" ]