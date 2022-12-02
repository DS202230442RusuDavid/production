###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.12.1-slim As development

###################
# ENV 
###################
# ENV DB_PORT=3306
# ENV DB_HOST=172.18.0.2
# ENV DB_USER=root
# ENV DB_PASSWORD=root
# ENV DB_NAME=oeup
ENV JWT_SECRET=secret
ENV JWT_EXPIRATION_TIME=900000

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --force

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.12.1-slim As build

###################
# ENV 
###################
# ENV DB_PORT=3306
# ENV DB_HOST=172.18.0.2
# ENV DB_USER=root
# ENV DB_PASSWORD=root
# ENV DB_NAME=oeup
ENV JWT_SECRET=secret
ENV JWT_EXPIRATION_TIME=900000

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18.12.1-slim As production

###################
# ENV 
###################
# ENV DB_PORT=3306
# ENV DB_HOST=172.18.0.2
# ENV DB_USER=root
# ENV DB_PASSWORD=root
# ENV DB_NAME=oeup
ENV JWT_SECRET=secret
ENV JWT_EXPIRATION_TIME=900000

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
