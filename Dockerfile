# Build stage
FROM node:14 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:14-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy module-alias configuration
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "-r", "module-alias/register", "dist/index.js"]