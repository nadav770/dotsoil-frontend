# Docker Instructions for DOTS Frontend

## Quick Start

### Production Build
```bash
# Build and run production container
docker-compose up dots-frontend

# Or build manually
docker build -t dots-frontend .
docker run -p 3000:80 dots-frontend
```

### Development Build
```bash
# Run development container with hot reload
docker-compose --profile dev up dots-frontend-dev

# Or build manually
docker build -f Dockerfile.dev -t dots-frontend-dev .
docker run -p 3001:3000 -v $(pwd)/src:/app/src dots-frontend-dev
```

## Docker Commands

### Build Images
```bash
# Production image
docker build -t dots-frontend:latest .

# Development image
docker build -f Dockerfile.dev -t dots-frontend:dev .
```

### Run Containers
```bash
# Production
docker run -d -p 3000:80 --name dots-frontend dots-frontend:latest

# Development
docker run -d -p 3001:3000 --name dots-frontend-dev -v $(pwd)/src:/app/src dots-frontend:dev
```

### Stop and Remove
```bash
docker stop dots-frontend dots-frontend-dev
docker rm dots-frontend dots-frontend-dev
```

## Environment Variables

### Production
- `NODE_ENV=production`
- Port: 80 (internal), 3000 (external)

### Development
- `NODE_ENV=development`
- Port: 3000 (internal), 3001 (external)
- Hot reload enabled
- Source code mounted as volume

## Health Check

The production container includes a health check endpoint:
- URL: `/health`
- Expected response: `healthy`
- Check interval: 30 seconds

## Performance Features

- **Multi-stage build** for smaller final image
- **Gzip compression** enabled
- **Static asset caching** (1 year for JS/CSS, no cache for HTML)
- **Security headers** configured
- **Nginx** as reverse proxy

## Troubleshooting

### Build Issues
```bash
# Clean build
docker system prune -a
docker build --no-cache -t dots-frontend .
```

### Port Conflicts
```bash
# Check what's using port 3000
netstat -tulpn | grep :3000

# Use different port
docker run -p 3001:80 dots-frontend
```

### Development Hot Reload Not Working
```bash
# Ensure volume mounting is correct
docker run -v $(pwd)/src:/app/src -p 3001:3000 dots-frontend:dev
```
