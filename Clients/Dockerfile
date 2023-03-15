# stage1
FROM node:18 as build-step

RUN mkdir -p /app
WORKDIR /app

RUN npm install --save-dev vite -g

COPY . .

RUN npm i --prefix Game && npm i --prefix FrontOffice && npm i --prefix BackOffice

WORKDIR /app/Game
RUN vite build --base=/game

WORKDIR /app/FrontOffice
RUN vite build --base=/frontoffice

WORKDIR /app/BackOffice
RUN vite build --base=/backoffice

# stage2
FROM nginx

COPY --from=build-step /app/Game/dist/ /opt/game/
COPY --from=build-step /app/FrontOffice/dist/ /opt/frontoffice/
COPY --from=build-step /app/BackOffice/dist/ /opt/backoffice/

COPY ./conf/default.conf /etc/nginx/conf.d/

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]