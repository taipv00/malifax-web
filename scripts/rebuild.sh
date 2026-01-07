#!/bin/bash

# Script to rebuild Docker containers when code changes
# Usage: ./scripts/rebuild.sh

set -e

echo "🔨 Starting Docker rebuild..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse arguments
BUILD_FRONTEND=false
BUILD_BACKEND=false
BUILD_ALL=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --frontend|-f)
      BUILD_FRONTEND=true
      shift
      ;;
    --backend|-b)
      BUILD_BACKEND=true
      shift
      ;;
    --all|-a)
      BUILD_ALL=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: ./scripts/rebuild.sh [--frontend|-f] [--backend|-b] [--all|-a]"
      exit 1
      ;;
  esac
done

# If no flags provided, default to all
if [ "$BUILD_FRONTEND" = false ] && [ "$BUILD_BACKEND" = false ] && [ "$BUILD_ALL" = false ]; then
  BUILD_ALL=true
fi

if [ "$BUILD_ALL" = true ]; then
  echo -e "${BLUE}📦 Rebuilding all containers...${NC}"

  echo "1️⃣  Building frontend..."
  docker-compose build --no-cache frontend

  echo "2️⃣  Building backend..."
  docker-compose build --no-cache backend

  echo "3️⃣  Restarting all containers..."
  docker-compose up -d

else
  if [ "$BUILD_FRONTEND" = true ]; then
    echo -e "${BLUE}📦 Rebuilding frontend...${NC}"
    docker-compose build --no-cache frontend
    docker-compose up -d frontend
  fi

  if [ "$BUILD_BACKEND" = true ]; then
    echo -e "${BLUE}📦 Rebuilding backend...${NC}"
    docker-compose build --no-cache backend
    docker-compose up -d backend
  fi
fi

echo ""
echo -e "${GREEN}✅ Rebuild completed successfully!${NC}"
echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "📝 View logs:"
echo "   docker-compose logs -f frontend"
echo "   docker-compose logs -f backend"
echo ""
echo "🌐 Access:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:4000"
echo "   MongoDB:  mongodb://admin:admin123@localhost:27017/malifax"
echo ""
