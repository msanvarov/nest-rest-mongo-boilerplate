FROM node:lts-alpine as build

WORKDIR /usr/local/app

# Copy application code to working directory
COPY package*.json .
COPY . .

# Download dependencies
RUN npm install

# Generate build artifacts
RUN npm run build

#Expose port and begin application
EXPOSE 3333

CMD ["node", "dist/apps/api/main.js"]