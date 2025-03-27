FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base as build
COPY . .
RUN npm run build

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base as prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]