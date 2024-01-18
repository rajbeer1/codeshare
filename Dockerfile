FROM node:alpine

COPY . .
RUN npm i
RUN npm run build
CMD [ "npm","run","start" ]