FROM node:latest
WORKDIR /web

ARG BACK_HOST
ARG BACK_PORT
# export D_HOST=$(docker network inspect bridge | jq '.[0].IPAM.Config[0].Gateway' | sed -n -r 's/\"//gp')
ENV WEBAPP_HOST $BACK_HOST
ENV BACKOFF_PORT $BACK_PORT

# Uncomment this to enable REACT APP
#COPY ./my-react-nextjs-app/ /web/

# Uncomment this to enable VUEJS APP
COPY ./my-vue-app/ /web/
RUN echo "VITE_WEBAPP_HOST=$WEBAPP_HOST\nVITE_BACKOFF_PORT=$BACKOFF_PORT" > .env
RUN npm install vite

# Uncomment this to enable REACT APP
#RUN npm install next react react-dom

# Uncomment this to enable ANGULAR APP
#RUN npm install @angular/cli

RUN npm install

# Uncomment this to enable VUEJS APP
CMD ["npm", "run", "dev", "--", "--host"]

# Uncomment this to enable REACT APP
#CMD ["npm", "run", "dev"]
