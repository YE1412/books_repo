FROM node:latest
WORKDIR /web

COPY ./my-react-nextjs-app/ /web/

ENV WEBAPP_HOST 172.17.0.1

RUN npm install

# EXPOSE 3000

CMD ["npm", "run", "dev"]
