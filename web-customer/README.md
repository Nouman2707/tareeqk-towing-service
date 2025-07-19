# 🌐 Tareeqk Web Customer App

A React web application for customers to request towing services and track their request status.

---

## ⚙️ Prerequisites

- ✅ Laravel backend must be running and accessible
- ✅ Node.js 18+
- ✅ npm installed

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/tareeqk-towing-service.git
cd tareeqk-towing-service/WebCustomer
```

---

### 2️⃣ Start Laravel Backend

In a separate terminal, navigate to the backend directory:

```bash
cd ../backend
php artisan serve --host=192.168.1.100 --port=8000
```

Replace `192.168.1.100` with your actual local IP.

---

### 3️⃣ Install and Start React App

In the `WebCustomer` directory:

```bash
npm install
npm start
```

The app will be available at:  
🌐 [http://localhost:3000](http://localhost:3000)

---

### 4️⃣ Create `.env` File

In the `WebCustomer` directory, create a `.env` file and add:

```env
REACT_APP_API_URL="http://192.168.1.76:8000/api"
REACT_APP_APP_NAME="Tareeqk Customer Portal"
```

Replace the IP with your actual machine IP running Laravel.

---

## ✅ Checklist

- [ ] Laravel backend is running
- [ ] `.env` file is created with correct API base URL
- [ ] React app starts without errors
- [ ] Towing request form and tracking works

---

## 📞 Support

For help or issues, please contact at +971 55 425 2715.

---

🎉 You're ready to use the Tareeqk Web Customer App!
