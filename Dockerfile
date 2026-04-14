# ---------- Stage 1: Build frontend ----------
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


# ---------- Stage 2: Build backend ----------
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

COPY server/package*.json ./
RUN npm install --production

COPY server/ .


# ---------- Stage 3: Final Image ----------
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/build ./backend/public

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "app.js"]