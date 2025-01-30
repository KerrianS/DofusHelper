# Stage 1: Build Frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend and Final Image
FROM node:18-slim
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend/ .

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/build ./public

# Expose port
EXPOSE 5000

# Environment variable for API keys (to be provided at runtime)
ENV API_KEY=""
ENV USER_KEY=""

# Start command
CMD ["node", "server.js"]
