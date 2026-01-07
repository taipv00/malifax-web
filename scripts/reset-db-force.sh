#!/bin/bash

# Script to reset database with default data (NO CONFIRMATION)
# Usage: ./scripts/reset-db-force.sh
# Use this for automated scripts/testing

set -e

echo "🔄 Starting database reset (FORCE MODE - no confirmation)..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker containers are running
if ! docker ps | grep -q malifax-backend; then
  echo -e "${RED}❌ Backend container is not running!${NC}"
  echo "Please start Docker first: docker-compose up -d"
  exit 1
fi

if ! docker ps | grep -q malifax-mongodb; then
  echo -e "${RED}❌ MongoDB container is not running!${NC}"
  echo "Please start Docker first: docker-compose up -d"
  exit 1
fi

echo "📦 Clearing database collections..."
docker exec malifax-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin malifax --eval "
  db.datas.deleteMany({});
  db.adminusers.deleteMany({});
  print('✅ Collections cleared');
"

echo "🔄 Restarting backend to trigger admin user creation..."
docker-compose restart backend

echo "⏳ Waiting for backend to initialize (10 seconds)..."
sleep 10

# Run the seed function
echo "🌱 Seeding database with default data..."
docker exec malifax-backend node -e "
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongodb:27017/malifax';

// Data schema
const dataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

// Initialize function
async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Data from malifax/public/data/data.json (original source)
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

    // Clear existing data
    await Data.deleteMany({ key: { \$in: ['partners', 'shop-products'] } });

    // Insert new data
    await Data.create({
      key: 'partners',
      data: JSON.stringify(defaultPartners)
    });
    console.log(\`✅ Partners data created (\${defaultPartners.length} partners)\`);

    await Data.create({
      key: 'shop-products',
      data: JSON.stringify(defaultShopProducts)
    });
    console.log(\`✅ Shop products data created (\${defaultShopProducts.length} products)\`);

    console.log('✅ Database reset completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedData();
"

echo ""
echo -e "${GREEN}✅ Database reset completed successfully!${NC}"
echo ""
echo "📊 You can verify the data at:"
echo "   - Partners: http://localhost:4000/api/partners"
echo "   - Shop Products: http://localhost:4000/api/shop-products"
echo ""
