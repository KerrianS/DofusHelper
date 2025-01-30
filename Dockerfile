# Stage 1: Build Frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend and Final Image
FROM node:18
WORKDIR /app

# Install global dependencies
RUN npm install -g concurrently

# Install root dependencies
COPY package*.json ./
RUN npm install

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source files
COPY . .

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Expose ports
EXPOSE 5000
EXPOSE 3000

# Environment variable for API keys
ENV API_KEY=""
ENV USER_KEY=""

# Start command
CMD ["npm", "start"]
