FROM node:latest
WORKDIR /web

ARG DOCK_HOST
# export D_HOST=$(ip -4 -o address | sed -r 's/\s{2,}/ /g' | awk -F " " '{print $2" "$4}' | sed -r -n 's/docker.*\s//p' | sed -r -n 's/\/.*//p')
# export D_HOST=$(docker network inspect bridge | jq '.[0].IPAM.Config.[0].Gateway' | sed -n -r 's/\"//gp')
ENV WEBAPP_HOST $DOCK_HOST
COPY ./my-react-nextjs-app/ /web/
#COPY ./my-vue-app/  /web/
RUN npm install

# EXPOSE 3000

#CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npm", "run", "dev"]
