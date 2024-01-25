FROM node:alpine

COPY . .
RUN npm i
EXPOSE 3000
RUN npm run build
CMD [ "npm","run","start" ]