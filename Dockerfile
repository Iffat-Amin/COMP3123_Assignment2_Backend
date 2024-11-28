# Use Node.js LTS version
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "dev"]
