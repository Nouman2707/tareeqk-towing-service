<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tareeqk Towing Service - API Dashboard</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: {
                                50: '#eff6ff',
                                500: '#3b82f6',
                                600: '#2563eb',
                                700: '#1d4ed8',
                            }
                        }
                    }
                }
            }
        </script>

        <style>
            body { font-family: 'Instrument Sans', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-50 text-gray-900">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <h1 class="text-3xl font-bold text-primary-600">🚛 Tareeqk</h1>
                            <p class="text-sm text-gray-500">Towing Service API</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="text-sm text-gray-600">API Online</span>
                        </div>
                        @if (Route::has('login'))
                            @auth
                                <a href="{{ url('/dashboard') }}" class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                    Dashboard
                                </a>
                            @else
                                <a href="{{ route('login') }}" class="text-gray-600 hover:text-gray-900 px-3 py-2">
                                    Log in
                                </a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                        Register
                                    </a>
                                @endif
                            @endauth
                        @endif
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Hero Section -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                    Tareeqk Towing Service
                </h2>
                <p class="text-xl text-gray-600 mb-8">
                    Professional towing and roadside assistance API for Dubai and UAE
                </p>
                <div class="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Laravel {{ app()->version() }} | API v1.0.0
                </div>
            </div>

            <!-- API Endpoints Section -->
            <div class="grid lg:grid-cols-2 gap-8 mb-16">
                <!-- API Testing Panel -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        🔧 API Testing Panel
                    </h3>

                    <!-- Health Check -->
                    <div class="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                            ✅ Health Check
                        </h4>
                        <p class="text-sm text-green-700 mb-3">Check if the API is running</p>
                        <div class="bg-green-100 p-3 rounded font-mono text-sm">
                            <strong>GET</strong> <a href="{{ url('/api/health') }}" target="_blank" class="text-green-700 hover:underline">{{ url('/api/health') }}</a>
                        </div>
                    </div>

                    <!-- Get All Requests -->
                    <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
                            📋 Get All Requests
                        </h4>
                        <p class="text-sm text-blue-700 mb-3">Retrieve all towing requests</p>
                        <div class="bg-blue-100 p-3 rounded font-mono text-sm">
                            <strong>GET</strong> <a href="{{ url('/api/requests') }}" target="_blank" class="text-blue-700 hover:underline">{{ url('/api/requests') }}</a>
                        </div>
                    </div>

                    <!-- Create Request -->
                    <div class="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 class="font-semibold text-purple-800 mb-2 flex items-center">
                            ➕ Create Request
                        </h4>
                        <p class="text-sm text-purple-700 mb-3">Submit a new towing request</p>
                        <div class="bg-purple-100 p-3 rounded font-mono text-sm">
                            <strong>POST</strong> <span class="text-purple-700">{{ url('/api/requests') }}</span>
                        </div>
                    </div>

                    <!-- Update Request -->
                    <div class="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 class="font-semibold text-orange-800 mb-2 flex items-center">
                            🔄 Update Request Status
                        </h4>
                        <p class="text-sm text-orange-700 mb-3">Update request status (for drivers)</p>
                        <div class="bg-orange-100 p-3 rounded font-mono text-sm">
                            <strong>PUT</strong> <span class="text-orange-700">{{ url('/api/requests/{id}') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Documentation & Instructions -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        📚 Documentation
                    </h3>

                    <!-- Quick Start -->
                    <div class="mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">🚀 Quick Start</h4>
                        <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
                            <li>Click on the API endpoints to test them</li>
                            <li>Use a tool like Postman or curl for POST/PUT requests</li>
                            <li>Check the example JSON formats below</li>
                            <li>Monitor responses and status codes</li>
                        </ol>
                    </div>

                    <!-- Example Request -->
                    <div class="mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">📝 Example POST Request</h4>
                        <div class="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
<pre>{
  "customer_name": "Ahmed Al-Rashid",
  "location": "Dubai Mall, Downtown Dubai",
  "note": "Car broke down in parking lot"
}</pre>
                        </div>
                    </div>

                    <!-- Example Response -->
                    <div class="mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">📤 Example Response</h4>
                        <div class="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto">
<pre>{
  "success": true,
  "message": "Request created successfully",
  "data": {
    "id": 1,
    "customer_name": "Ahmed Al-Rashid",
    "location": "Dubai Mall, Downtown Dubai",
    "note": "Car broke down in parking lot",
    "status": "pending",
    "created_at": "2025-01-18T10:30:00Z"
  }
}</pre>
                        </div>
                    </div>

                    <!-- Status Values -->
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">🏷️ Status Values</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">pending</span>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">accepted</span>
                            <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded">in_progress</span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
                            <span class="bg-red-100 text-red-800 px-2 py-1 rounded">cancelled</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Components -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-16">
                <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">🏗️ System Architecture</h3>
                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Backend API -->
                    <div class="text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">⚙️</span>
                        </div>
                        <h4 class="font-semibold text-gray-900 mb-2">Laravel Backend API</h4>
                        <p class="text-gray-600 text-sm mb-4">REST API with MySQL database for towing request management</p>
                        <div class="bg-green-50 p-3 rounded">
                            <p class="text-green-800 font-medium text-sm">✅ Active</p>
                            <p class="text-green-600 text-xs">{{ url('/api') }}</p>
                        </div>
                    </div>

                    <!-- Web Customer App -->
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🌐</span>
                        </div>
                        <h4 class="font-semibold text-gray-900 mb-2">React Web App</h4>
                        <p class="text-gray-600 text-sm mb-4">Customer interface for submitting towing requests</p>
                        <div class="bg-blue-50 p-3 rounded">
                            <p class="text-blue-800 font-medium text-sm">🚀 Development</p>
                            <p class="text-blue-600 text-xs">Port 3000</p>
                        </div>
                    </div>

                    <!-- Mobile Driver App -->
                    <div class="text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">📱</span>
                        </div>
                        <h4 class="font-semibold text-gray-900 mb-2">React Native App</h4>
                        <p class="text-gray-600 text-sm mb-4">Driver mobile app for managing requests</p>
                        <div class="bg-purple-50 p-3 rounded">
                            <p class="text-purple-800 font-medium text-sm">📲 Expo</p>
                            <p class="text-purple-600 text-xs">iOS & Android</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Testing Tools -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">🧪 Testing Tools & Commands</h3>

                <div class="grid md:grid-cols-2 gap-8">
                    <!-- curl Commands -->
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-4">📡 cURL Commands</h4>

                        <div class="space-y-4">
                            <div>
                                <p class="text-sm font-medium text-gray-700 mb-2">Health Check:</p>
                                <div class="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                                    <code>curl {{ url('/api/health') }}</code>
                                </div>
                            </div>

                            <div>
                                <p class="text-sm font-medium text-gray-700 mb-2">Get All Requests:</p>
                                <div class="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                                    <code>curl {{ url('/api/requests') }}</code>
                                </div>
                            </div>

                            <div>
                                <p class="text-sm font-medium text-gray-700 mb-2">Create Request:</p>
                                <div class="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
<code>curl -X POST {{ url('/api/requests') }} \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"Test User","location":"Test Location","note":"Test note"}'</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Development URLs -->
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-4">🔗 Development URLs</h4>

                        <div class="space-y-3">
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm font-medium">Laravel API</span>
                                <a href="{{ url('/') }}" class="text-primary-600 hover:text-primary-700 text-sm">{{ url('/') }}</a>
                            </div>

                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm font-medium">API Health</span>
                                <a href="{{ url('/api/health') }}" target="_blank" class="text-primary-600 hover:text-primary-700 text-sm">{{ url('/api/health') }}</a>
                            </div>

                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm font-medium">All Requests</span>
                                <a href="{{ url('/api/requests') }}" target="_blank" class="text-primary-600 hover:text-primary-700 text-sm">{{ url('/api/requests') }}</a>
                            </div>

                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm font-medium">React Web App</span>
                                <span class="text-gray-500 text-sm">http://localhost:3000</span>
                            </div>

                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm font-medium">React Native App</span>
                                <span class="text-gray-500 text-sm">Expo Go App</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-8 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 class="text-lg font-semibold mb-4">🚛 Tareeqk Towing</h4>
                        <p class="text-gray-300">
                            Professional towing and roadside assistance API built with Laravel, React, and React Native.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">📚 Documentation</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="{{ url('/api/health') }}" class="hover:text-white">API Health Check</a></li>
                            <li><a href="{{ url('/api/requests') }}" class="hover:text-white">View All Requests</a></li>
                            <li><span class="text-gray-400">React App (Port 3000)</span></li>
                            <li><span class="text-gray-400">Mobile App (Expo)</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">🔧 Tech Stack</h4>
                        <div class="space-y-2 text-gray-300">
                            <p><strong>Backend:</strong> Laravel {{ app()->version() }} + MySQL</p>
                            <p><strong>Web:</strong> React + TypeScript + Tailwind</p>
                            <p><strong>Mobile:</strong> React Native + Expo</p>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Tareeqk Towing Service. Built for demonstration purposes.</p>
                </div>
            </div>
        </footer>

        <!-- Auto-refresh API status -->
        <script>
            // Auto-test API health every 30 seconds
            setInterval(async () => {
                try {
                    const response = await fetch('{{ url('/api/health') }}');
                    const status = response.ok ? 'online' : 'offline';
                    console.log('API Status:', status);
                } catch (error) {
                    console.log('API Status: offline');
                }
            }, 30000);
        </script>
    </body>
</html>
