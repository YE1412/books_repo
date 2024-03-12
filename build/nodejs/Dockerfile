FROM node:latest
WORKDIR /web

COPY ./my-react-nextjs-app/ /web/

ARG DOCK_HOST
ENV WEBAPP_HOST $DOCK_HOST

# RUN export WEBAPP_HOST=$(ip -4 -o address | sed -r 's/\s{2,}/ /g' | awk -F " " '{print $2" "$4}' | sed -r -n 's/docker.*\s//p' | sed -r -n 's/\/.*//p')

RUN npm install

# EXPOSE 3000

CMD ["npm", "run", "dev"]
