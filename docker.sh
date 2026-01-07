#!/bin/bash

# Docker Management Script for Malifax Project
# Usage: ./docker.sh [command]

case "$1" in
  start)
    echo "🚀 Starting all services..."
    docker-compose up -d
    echo "✅ Services started!"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:4000"
    ;;

  stop)
    echo "🛑 Stopping all services..."
    docker-compose down
    echo "✅ Services stopped!"
    ;;

  restart)
    echo "🔄 Restarting all services..."
    docker-compose restart
    echo "✅ Services restarted!"
    ;;

  build)
    echo "🔨 Building all services..."
    docker-compose up -d --build
    echo "✅ Build complete and services started!"
    ;;

  logs)
    if [ -z "$2" ]; then
      echo "📋 Showing logs for all services..."
      docker-compose logs -f
    else
      echo "📋 Showing logs for $2..."
      docker-compose logs -f "$2"
    fi
    ;;

  status)
    echo "📊 Service status:"
    docker-compose ps
    ;;

  clean)
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down -v
    echo "✅ Cleanup complete!"
    ;;

  reset)
    echo "🔄 Resetting everything (including database)..."
    docker-compose down -v
    docker-compose up -d --build
    echo "✅ Reset complete!"
    ;;

  *)
    echo "Malifax Docker Management Script"
    echo ""
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       - Start all services"
    echo "  stop        - Stop all services"
    echo "  restart     - Restart all services"
    echo "  build       - Rebuild and start all services"
    echo "  logs        - Show logs (add service name for specific logs)"
    echo "  status      - Show service status"
    echo "  clean       - Stop and remove all containers and volumes"
    echo "  reset       - Clean and rebuild everything"
    echo ""
    echo "Examples:"
    echo "  ./docker.sh start"
    echo "  ./docker.sh logs frontend"
    echo "  ./docker.sh build"
    ;;
esac
