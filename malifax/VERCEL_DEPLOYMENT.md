# Vercel Deployment Guide

## 🚀 Deploy to Vercel with PostgreSQL

### Step 1: Setup Vercel Postgres Database

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Login to your account

2. **Create New Project**
   - Click "New Project"
   - Import your GitHub repository

3. **Add Postgres Database**
   - In your project dashboard, go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose "Hobby" plan (Free tier)
   - Click "Create"

4. **Get Connection String**
   - After creation, go to "Storage" → "Postgres"
   - Copy the connection string (starts with `postgres://`)

### Step 2: Configure Environment Variables

1. **In Vercel Dashboard**
   - Go to your project → "Settings" → "Environment Variables"
   - Add these variables:

```
POSTGRES_URL=your_postgres_connection_string_here
```

2. **For Local Development**
   - Create `.env.local` file in your project root:
```
POSTGRES_URL=your_postgres_connection_string_here
```

### Step 3: Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Vercel Postgres"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically detect changes
   - Build and deploy your project
   - Database tables will be created automatically on first API call

### Step 4: Verify Deployment

1. **Check API Endpoints**
   - Visit `https://your-app.vercel.app/api/partners`
   - Should return partners data from PostgreSQL

2. **Test Admin Panel**
   - Visit `https://your-app.vercel.app/admin/partners`
   - Test CRUD operations

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check `POSTGRES_URL` environment variable
   - Ensure database is created in Vercel

2. **Table Not Found**
   - First API call will create tables automatically
   - Check Vercel function logs for errors

3. **Build Errors**
   - Ensure `@vercel/postgres` is installed
   - Check TypeScript errors

### Environment Variables Checklist:

- ✅ `POSTGRES_URL` - PostgreSQL connection string
- ✅ `NODE_ENV` - Set to "production" in Vercel

## 📊 Database Schema

The following tables will be created automatically:

### Partners Table:
```sql
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_src TEXT NOT NULL,
  website_url TEXT,
  alt_text TEXT,
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shop Products Table:
```sql
CREATE TABLE shop_products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  logo_src TEXT NOT NULL,
  logo_alt TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Features After Deployment:

- ✅ **Persistent Data** - All changes saved to PostgreSQL
- ✅ **Auto-scaling** - Vercel handles traffic spikes
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **SSL Certificate** - Automatic HTTPS
- ✅ **Environment Variables** - Secure configuration
- ✅ **Function Logs** - Debug issues easily

## 💰 Cost:

- **Vercel Hobby Plan**: Free
- **Postgres Hobby Plan**: Free (up to 500MB)
- **Bandwidth**: Free (100GB/month)

Perfect for small to medium projects!

## 🔄 Migration from SQLite:

The code has been automatically migrated from SQLite to PostgreSQL:
- All database operations now use `@vercel/postgres`
- API routes updated to use async/await
- Tables auto-created on first API call
- Data initialized from `public/data/data.json`

Your admin panel will work exactly the same, but now with persistent cloud storage!
