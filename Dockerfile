FROM node:alpine

COPY . .
RUN npm i
EXPOSE 5002
RUN npm run build
CMD [ "npm","run","start" ]