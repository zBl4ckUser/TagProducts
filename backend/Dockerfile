FROM node:23-slim
WORKDIR /usr/src/app

COPY package.json . 
COPY .env .
COPY prisma ./prisma/

RUN npm install 

EXPOSE 4000 

RUN apt-get update -y && apt-get install -y openssl

COPY . . 

CMD ["npm","run","dev"]