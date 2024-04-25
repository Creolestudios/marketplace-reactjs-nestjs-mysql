# Multistage docker build

# React - Build
FROM node:14-alpine AS production

WORKDIR /usr/src/app
COPY  package*.json ./
RUN npm install 
COPY . .
RUN npm run build

# Nginx Server
FROM nginx
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=production /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

