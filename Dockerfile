# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

# Create a user and group 'appuser' (or any name you prefer)
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Change ownership of the application files
RUN chown -R appuser:appuser .

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD ["node", "./dist/app.js"]
