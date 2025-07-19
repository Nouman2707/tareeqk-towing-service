# Tareeqk Backend API

Laravel-based REST API for towing service management with full CRUD operations, database seeding, and CORS configuration.

## 🚀 Features

- RESTful API with JSON responses
- MySQL/MariaDB database integration
- Request validation and comprehensive error handling
- Database seeding with sample data
- CORS configuration for cross-origin requests
- Laravel Sanctum for API authentication (ready for future use)

## 📋 Requirements

- PHP 8.1+
- Composer
- MySQL 8.0+ or MariaDB 10.4+
- Laravel 10.x
- XAMPP (recommended for local development)

## 🔧 Quick Setup

### 1. Install dependencies
```bash
composer install
```

### 2. Configure environment
Create `.env` file:
```env
APP_NAME=TareeqkAPI
APP_ENV=local
APP_KEY=base64:your_generated_key_here
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tareeqk_db
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### 3. Setup database
```sql
CREATE DATABASE tareeqk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Laravel setup
```bash
php artisan key:generate
php artisan install:api
php artisan migrate
php artisan db:seed
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan serve
```
## 🖥️ Local Network Access

To make the Laravel backend accessible on your **local network** (e.g., from a mobile device or another computer on the same Wi-Fi), run the following command:

```bash
php artisan serve --host=192.168.1.76 --port=8000
```

⚠️ **Note:** Replace `192.168.1.76` with your actual local IP address. You can find it using:
* `ipconfig` (on Windows)
* `ifconfig` or `ip a` (on macOS/Linux)

Once the server is running, access your Laravel app via: **http://192.168.1.76:8000** on any device connected to the same network.

**Important:** Ensure your firewall allows connections to port `8000`.

### Finding Your Local IP Address

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**macOS/Linux:**
```bash
# Option 1
ifconfig

# Option 2
ip a

# Option 3 (macOS)
ipconfig getifaddr en0
```

### Update API Base URL

When accessing from other devices, update your API base URL from:
- `http://localhost:8000/api` 
- To: `http://YOUR_LOCAL_IP:8000/api` (e.g., `http://192.168.1.76:8000/api`)

## 📡 API Endpoints

**Base URL:** `http://localhost:8000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API status check |
| GET | `/requests` | Get all towing requests |
| POST | `/requests` | Create new request |
| GET | `/requests/{id}` | Get specific request |
| PUT | `/requests/{id}` | Update request status |

### Health Check Response
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-07-17T13:25:00.000000Z"
}
```

### Example Requests

**Create Request:**
```bash
POST /api/requests
Content-Type: application/json

{
  "customer_name": "John Doe",
  "location": "Dubai Mall, Downtown Dubai",
  "note": "Flat tire in parking lot"
}
```

**Update Status:**
```bash
PUT /api/requests/1
Content-Type: application/json

{
  "status": "accepted"
}
```

**Response Format:**
```json
{
  "success": true,
  "message": "Towing request created successfully",
  "data": {
    "id": 6,
    "customer_name": "John Doe",
    "location": "Dubai Mall, Downtown Dubai",
    "note": "Flat tire in parking lot",
    "status": "pending",
    "created_at": "2025-07-17T14:30:00.000000Z",
    "updated_at": "2025-07-17T14:30:00.000000Z"
  }
}
```

## 🗄️ Database Schema

**towing_requests table:**

| Column | Type | Description |
|--------|------|-------------|
| `id` | Primary Key | Auto-incrementing ID |
| `customer_name` | VARCHAR(255) | Customer's full name |
| `location` | VARCHAR(500) | Pickup location |
| `note` | TEXT (nullable) | Additional notes |
| `status` | ENUM | Request status (pending, accepted, in_progress, completed, cancelled) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## 🧪 Testing

### Manual Testing with cURL

```bash
# Health check
curl http://localhost:8000/api/health

# Get all requests
curl http://localhost:8000/api/requests

# Get requests with status filter
curl "http://localhost:8000/api/requests?status=pending"

# Create request
curl -X POST http://localhost:8000/api/requests \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"Test User","location":"Test Location","note":"Test note"}'

# Get specific request
curl http://localhost:8000/api/requests/1

# Update status
curl -X PUT http://localhost:8000/api/requests/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"accepted"}'
```

### Using Postman

Import these requests:
- `GET http://localhost:8000/api/health`
- `GET http://localhost:8000/api/requests`
- `POST http://localhost:8000/api/requests` (with JSON body)
- `GET http://localhost:8000/api/requests/1`
- `PUT http://localhost:8000/api/requests/1` (with JSON body)

## 🚨 Troubleshooting

### Database Connection Issues
- Ensure XAMPP MySQL is running
- Verify database exists and credentials in `.env`
- Check database permissions

### Routes Not Found (404)
```bash
php artisan route:clear
php artisan route:list
```

### Migration Errors
```bash
php artisan migrate:fresh --seed
```

### Port Already in Use
```bash
php artisan serve --port=8001
```

### Clear All Caches
```bash
php artisan optimize:clear
```

## 🔐 Error Handling

### Validation Errors (422)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "customer_name": ["The customer name field is required."],
    "location": ["The location must be at least 5 characters."]
  }
}
```

### Not Found Errors (404)
```json
{
  "success": false,
  "message": "Towing request not found"
}
```

## 🚀 Production Deployment

### Environment Variables
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_DATABASE=production_db_name
DB_USERNAME=production_username
DB_PASSWORD=secure_password
```

### Production Commands
```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force
```

## 🔒 Security Notes

- Input validation implemented for all endpoints
- SQL injection protection via Eloquent ORM
- Laravel Sanctum installed for future authentication
- CORS configured for cross-origin requests
- API is currently open (no authentication required)

## 🌐 CORS Configuration

For production, update `config/cors.php`:
```php
'allowed_origins' => [
    'https://yourdomain.com',
    'https://app.yourdomain.com',
],
```

---

**Version:** 1.0.2 | **Framework:** Laravel 10.x | **License:** MIT
