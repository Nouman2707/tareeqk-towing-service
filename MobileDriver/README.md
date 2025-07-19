# 🚗 Tareeqk Driver App

A React Native (Expo + TypeScript) mobile app for drivers to manage towing service requests. Connects to a Laravel backend for real-time updates.

---

## ⚙️ Prerequisites

- ✅ Laravel backend running and accessible via local IP
- ✅ Node.js 18+
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ Expo Go app installed on your mobile (iOS/Android)

---

## 🚀 Quick Start

### 1️⃣ Start Laravel Backend

In your backend folder:

```bash
php artisan serve --host=192.168.1.100 --port=8000
```

Replace `192.168.1.100` with your actual local IP (run `ipconfig` or `ifconfig` to find it).

---

### 2️⃣ Configure Mobile App API

In `src/services/api.ts`:

```ts
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.100:8000/api' 
  : 'https://your-production-api.com/api';
```

Update the IP address as needed.

---

### 3️⃣ Start Mobile App

In the `MobileDriver` folder:

```bash
npm install
npx expo install @react-native-async-storage/async-storage@2.1.2
npx expo start --clear
```

- Scan the QR code using the Expo Go app
- App will connect to the backend and start working

---

## ✅ API Test (Optional)

Test the backend API:

```bash
# From your computer
curl http://localhost:8000/api/health

# From your mobile device
curl http://192.168.1.100:8000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "API is running"
}
```

---

## ✅ Checklist

- [ ] Laravel backend running
- [ ] Correct IP in `api.ts`
- [ ] Both devices on same Wi-Fi
- [ ] Expo Go loads the app
- [ ] Request list loads successfully

---

## 📞 Support

For help or issues, please contact at +971 55 425 2715.

---

🎉 You're ready to go!
