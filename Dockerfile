# ========== BUILDER STAGE ==========
FROM node:20-alpine AS builder

# Set workdir
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# TypeScript build (outputs compiled JS to /app/dist)
RUN npm run build

# ========== RUNTIME STAGE ==========
FROM node:20-alpine

WORKDIR /app

# Copy only production files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose API port
EXPOSE 3000

# Start backend
CMD ["node", "dist/index.js"]
