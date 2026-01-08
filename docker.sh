#!/bin/bash

# Docker Management Script for Malifax Project
# Usage: ./docker.sh [command] or ./docker.sh (interactive mode)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to show menu
show_menu() {
    clear
    echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   Malifax Docker Management Menu     ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
    echo ""
    echo "  1) Start all services"
    echo "  2) Stop all services"
    echo "  3) Restart all services"
    echo "  4) Build and start services"
    echo "  5) View logs (all services)"
    echo "  6) View logs (specific service)"
    echo "  7) Check service status"
    echo "  8) Seed/Reset database"
    echo "  9) Clean up (remove containers & volumes)"
    echo " 10) Full reset (clean + rebuild)"
    echo "  0) Exit"
    echo ""
    echo -e "${YELLOW}Current services:${NC}"
    echo "  • Frontend: http://localhost:3080"
    echo "  • Backend:  http://localhost:4200"
    echo ""
}

# Function to seed database
seed_database() {
    echo -e "${BLUE}🌱 Database Seeding${NC}"
    echo ""

    # Check if containers are running
    if ! docker ps | grep -q malifax-backend; then
        echo -e "${RED}❌ Backend container is not running!${NC}"
        echo "Please start Docker first (option 1 or 4)"
        read -p "Press Enter to continue..."
        return
    fi

    if ! docker ps | grep -q malifax-mongodb; then
        echo -e "${RED}❌ MongoDB container is not running!${NC}"
        echo "Please start Docker first (option 1 or 4)"
        read -p "Press Enter to continue..."
        return
    fi

    echo -e "${YELLOW}⚠️  This will delete ALL data and reset with default values.${NC}"
    echo ""
    read -p "Are you sure? (yes/no): " -r
    echo

    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        echo "❌ Database seeding cancelled."
        read -p "Press Enter to continue..."
        return
    fi

    echo "📦 Clearing database collections..."
    docker exec malifax-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin malifax --eval "
      db.datas.deleteMany({});
      db.adminusers.deleteMany({});
      print('✅ Collections cleared');
    "

    echo "🔄 Restarting backend..."
    docker-compose restart backend

    echo "⏳ Waiting for backend to initialize (10 seconds)..."
    sleep 10

    echo "🌱 Seeding database with default data..."
    docker exec malifax-backend node -e "
    const mongoose = require('mongoose');
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongodb:27017/malifax';
    const dataSchema = new mongoose.Schema({
      key: { type: String, required: true, unique: true },
      data: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    const Data = mongoose.model('Data', dataSchema);

    async function seedData() {
      try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const defaultPartners = [
          { name: '3CX', logo_src: '/imgs/logo-mf/3cx.png', website_url: 'https://www.3cx.com/', alt_text: '3CX', order_index: 1 },
          { name: 'Acronis', logo_src: '/imgs/logo-mf/Acronis-logo.png', website_url: 'https://www.acronis.com/', alt_text: 'Acronis', order_index: 2 },
          { name: 'APC', logo_src: '/imgs/logo-mf/APC-Emblem.png', website_url: 'https://www.apc.com/', alt_text: 'APC', order_index: 3 },
          { name: 'Aruba', logo_src: '/imgs/logo-mf/ARUBA.png', website_url: 'https://arubanetworking.hpe.com/', alt_text: 'Aruba', order_index: 4 },
          { name: 'Avaya', logo_src: '/imgs/logo-mf/Avaya.png', website_url: 'https://www.avaya.com/', alt_text: 'Avaya', order_index: 5 },
          { name: 'AWS', logo_src: '/imgs/logo-mf/Amazon_Web_Services_Logo.svg.png', website_url: 'https://aws.amazon.com/', alt_text: 'AWS', order_index: 6 },
          { name: 'Blackpanda', logo_src: '/imgs/logo-mf/blackpanda.png', website_url: 'https://www.blackpanda.com/', alt_text: 'Blackpanda', order_index: 7 },
          { name: 'Checkpoint', logo_src: '/imgs/logo-mf/Check-Point-2024-logo-color.png', website_url: 'https://www.checkpoint.com/', alt_text: 'Checkpoint', order_index: 8 },
          { name: 'Cisco', logo_src: '/imgs/logo-mf/cisco.png', website_url: 'https://www.cisco.com/', alt_text: 'Cisco', order_index: 9 },
          { name: 'CrowdStrike', logo_src: '/imgs/logo-mf/CrowdStrike_Logo_2023_Secondary_Red.png', website_url: 'https://www.crowdstrike.com/', alt_text: 'CrowdStrike', order_index: 10 },
          { name: 'Darktrace', logo_src: '/imgs/logo-mf/Darktrace.png', website_url: 'https://www.darktrace.com/', alt_text: 'Darktrace', order_index: 11 },
          { name: 'Datto', logo_src: '/imgs/logo-mf/datto.png', website_url: 'https://www.datto.com/', alt_text: 'Datto', order_index: 12 },
          { name: 'Dell', logo_src: '/imgs/logo-mf/dell.png', website_url: 'https://www.dell.com/', alt_text: 'Dell', order_index: 13 },
          { name: 'Fortinet', logo_src: '/imgs/logo-mf/Fortinet.png', website_url: 'https://www.fortinet.com/', alt_text: 'Fortinet', order_index: 14 },
          { name: 'Google Cloud', logo_src: '/imgs/logo-mf/Google-Cloud-Logo.png', website_url: 'https://cloud.google.com/', alt_text: 'Google Cloud', order_index: 15 },
          { name: 'H3C', logo_src: '/imgs/logo-mf/H3C.png', website_url: 'https://www.h3c.com/', alt_text: 'H3C', order_index: 16 },
          { name: 'HPE', logo_src: '/imgs/logo-mf/hpe_pri_grn_pos_rgb.png', website_url: 'https://www.hpe.com/', alt_text: 'HPE', order_index: 17 },
          { name: 'Huawei', logo_src: '/imgs/logo-mf/huawei.png', website_url: 'https://www.huawei.com/', alt_text: 'Huawei', order_index: 18 },
          { name: 'IBM', logo_src: '/imgs/logo-mf/IBM.png', website_url: 'https://www.ibm.com/', alt_text: 'IBM', order_index: 19 },
          { name: 'Lenovo', logo_src: '/imgs/logo-mf/Lenovo-Logo.png', website_url: 'https://www.lenovo.com/', alt_text: 'Lenovo', order_index: 20 },
          { name: 'Logitech', logo_src: '/imgs/logo-mf/Logitech_logo.svg.png', website_url: 'https://www.logitech.com/', alt_text: 'Logitech', order_index: 21 },
          { name: 'McAfee', logo_src: '/imgs/logo-mf/mcafee.png', website_url: 'https://www.mcafee.com/', alt_text: 'McAfee', order_index: 22 },
          { name: 'Microsoft', logo_src: '/imgs/logo-mf/microsoft.png', website_url: 'https://www.microsoft.com/', alt_text: 'Microsoft', order_index: 23 },
          { name: 'Palo Alto Networks', logo_src: '/imgs/logo-mf/panw_CMYK_Logo_Positive.png', website_url: 'https://www.paloaltonetworks.com/', alt_text: 'Palo Alto Networks', order_index: 24 },
          { name: 'Ruckus', logo_src: '/imgs/logo-mf/Ruckus_logo_black-orange.png', website_url: 'https://www.ruckusnetworks.com/', alt_text: 'Ruckus', order_index: 25 },
          { name: 'Sophos', logo_src: '/imgs/logo-mf/Sophos.png', website_url: 'https://www.sophos.com/', alt_text: 'Sophos', order_index: 26 },
          { name: 'Synology', logo_src: '/imgs/logo-mf/Synology_logo_Black.png', website_url: 'https://www.synology.com/', alt_text: 'Synology', order_index: 27 },
          { name: 'Trend Micro', logo_src: '/imgs/logo-mf/trend-micro.png', website_url: 'https://www.trendmicro.com/', alt_text: 'Trend Micro', order_index: 28 },
          { name: 'Ubiquiti', logo_src: '/imgs/logo-mf/Ubiquiti-Networks-Logo.png', website_url: 'https://ui.com/', alt_text: 'Ubiquiti', order_index: 29 },
          { name: 'Veeam', logo_src: '/imgs/logo-mf/Veeam_main_logo_without_contor_RGB.png', website_url: 'https://www.veeam.com/', alt_text: 'Veeam', order_index: 30 },
          { name: 'VMware', logo_src: '/imgs/logo-mf/vmware-logo-black.png', website_url: 'https://www.vmware.com/', alt_text: 'VMware', order_index: 31 },
          { name: 'WatchGuard', logo_src: '/imgs/logo-mf/watchguard-logo.png', website_url: 'https://www.watchguard.com/', alt_text: 'WatchGuard', order_index: 32 },
          { name: 'Zscaler', logo_src: '/imgs/logo-mf/zscaler-logo 1.png', website_url: 'https://www.zscaler.com/', alt_text: 'Zscaler', order_index: 33 }
        ];

        const defaultShopProducts = [
          { id: 1, title: 'Blackpanda', description: \"Asia's leading local cyber incident response firm.\", logo_src: '/svgs/panda48_48.svg', logo_alt: 'Blackpanda Logo', order_index: 1 },
          { id: 2, title: 'Lenovo', description: 'Innovative consumer and enterprise technology products.', logo_src: '/svgs/lenovo.svg', logo_alt: 'Lenovo Logo', order_index: 2 },
          { id: 3, title: 'Aruba instant on', description: 'Enterprise-grade WiFi simple to set up and manage.', logo_src: '/svgs/arubar48_48.svg', logo_alt: 'Aruba Logo', order_index: 3 },
          { id: 4, title: 'Ubiquiti', description: 'Enterprise networking and security unified platform.', logo_src: '/svgs/Ubiquiti.svg', logo_alt: 'Ubiquiti Logo', order_index: 4 }
        ];

        await Data.deleteMany({ key: { \$in: ['partners', 'shop-products'] } });
        await Data.create({ key: 'partners', data: JSON.stringify(defaultPartners) });
        console.log(\`✅ Partners data created (\${defaultPartners.length} partners)\`);
        await Data.create({ key: 'shop-products', data: JSON.stringify(defaultShopProducts) });
        console.log(\`✅ Shop products data created (\${defaultShopProducts.length} products)\`);
        console.log('✅ Database seeded successfully!');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
      }
    }
    seedData();
    "

    echo ""
    echo -e "${GREEN}✅ Database seeding completed!${NC}"
    echo ""
    read -p "Press Enter to continue..."
}

# Interactive mode
if [ -z "$1" ]; then
    while true; do
        show_menu
        read -p "Select an option [0-10]: " choice

        case $choice in
            1)
                echo -e "${BLUE}🚀 Starting all services...${NC}"
                docker-compose up -d
                echo -e "${GREEN}✅ Services started!${NC}"
                echo "Frontend: http://localhost:3080"
                echo "Backend: http://localhost:4200"
                read -p "Press Enter to continue..."
                ;;
            2)
                echo -e "${BLUE}🛑 Stopping all services...${NC}"
                docker-compose down
                echo -e "${GREEN}✅ Services stopped!${NC}"
                read -p "Press Enter to continue..."
                ;;
            3)
                echo -e "${BLUE}🔄 Restarting all services...${NC}"
                docker-compose restart
                echo -e "${GREEN}✅ Services restarted!${NC}"
                read -p "Press Enter to continue..."
                ;;
            4)
                echo -e "${BLUE}🔨 Building all services...${NC}"
                docker-compose up -d --build
                echo -e "${GREEN}✅ Build complete and services started!${NC}"
                read -p "Press Enter to continue..."
                ;;
            5)
                echo -e "${BLUE}📋 Showing logs for all services...${NC}"
                echo "Press Ctrl+C to exit logs"
                sleep 2
                docker-compose logs -f
                ;;
            6)
                echo "Available services: frontend, backend, mongodb"
                read -p "Enter service name: " service
                echo -e "${BLUE}📋 Showing logs for $service...${NC}"
                echo "Press Ctrl+C to exit logs"
                sleep 2
                docker-compose logs -f "$service"
                ;;
            7)
                echo -e "${BLUE}📊 Service status:${NC}"
                docker-compose ps
                echo ""
                read -p "Press Enter to continue..."
                ;;
            8)
                seed_database
                ;;
            9)
                echo -e "${YELLOW}⚠️  This will remove all containers and volumes!${NC}"
                read -p "Are you sure? (yes/no): " -r
                if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
                    echo -e "${BLUE}🧹 Cleaning up Docker resources...${NC}"
                    docker-compose down -v
                    echo -e "${GREEN}✅ Cleanup complete!${NC}"
                else
                    echo "❌ Cleanup cancelled."
                fi
                read -p "Press Enter to continue..."
                ;;
            10)
                echo -e "${YELLOW}⚠️  This will reset everything including database!${NC}"
                read -p "Are you sure? (yes/no): " -r
                if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
                    echo -e "${BLUE}🔄 Resetting everything...${NC}"
                    docker-compose down -v
                    docker-compose up -d --build
                    echo -e "${GREEN}✅ Reset complete!${NC}"
                else
                    echo "❌ Reset cancelled."
                fi
                read -p "Press Enter to continue..."
                ;;
            0)
                echo -e "${GREEN}Goodbye!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid option. Please try again.${NC}"
                sleep 2
                ;;
        esac
    done
fi

# CLI mode (backward compatible)
case "$1" in
  start)
    echo "🚀 Starting all services..."
    docker-compose up -d
    echo "✅ Services started!"
    echo "Frontend: http://localhost:3080"
    echo "Backend: http://localhost:4200"
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

  seed)
    # Call the seed function
    seed_database
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
    echo "       ./docker.sh          (interactive mode)"
    echo ""
    echo "Commands:"
    echo "  start       - Start all services"
    echo "  stop        - Stop all services"
    echo "  restart     - Restart all services"
    echo "  build       - Rebuild and start all services"
    echo "  logs        - Show logs (add service name for specific logs)"
    echo "  status      - Show service status"
    echo "  seed        - Seed/reset database with default data"
    echo "  clean       - Stop and remove all containers and volumes"
    echo "  reset       - Clean and rebuild everything"
    echo ""
    echo "Examples:"
    echo "  ./docker.sh              # Interactive menu"
    echo "  ./docker.sh start        # Start services"
    echo "  ./docker.sh logs frontend"
    echo "  ./docker.sh seed         # Seed database"
    ;;
esac
