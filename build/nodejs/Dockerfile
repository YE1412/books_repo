FROM node:latest
WORKDIR /web

ARG BACK_HOST
ARG BACK_PORT
# export D_HOST=$(docker network inspect bridge | jq '.[0].IPAM.Config[0].Gateway' | sed -n -r 's/\"//gp')
ENV WEBAPP_HOST $BACK_HOST
ENV BACKOFF_PORT $BACK_PORT
#COPY ./my-react-nextjs-app/ /web/
COPY ./my-vue-app/  /web/
RUN echo -e "VITE_WEBAPP_HOST=${WEBAPP_HOST}\nVITE_BACKOFF_PORT=${BACKOFF_PORT}" > .env
RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
#CMD ["npm", "run", "dev"]
