FROM node:lts-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]