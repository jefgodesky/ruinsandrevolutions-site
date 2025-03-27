FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base as build
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
ENV NODE_ENV=production
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]