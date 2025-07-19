<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TowingRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TowingRequestController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = TowingRequest::query();

            // Optional status filtering
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            $requests = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'message' => 'Towing requests retrieved successfully',
                'data' => $requests
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve towing requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'customer_name' => 'required|string|min:2|max:255',
                'location' => 'required|string|min:5|max:500',
                'note' => 'nullable|string|max:500'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $towingRequest = TowingRequest::create([
                'customer_name' => $request->customer_name,
                'location' => $request->location,
                'note' => $request->note,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Towing request created successfully',
                'data' => $towingRequest
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create towing request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $towingRequest = TowingRequest::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Towing request retrieved successfully',
                'data' => $towingRequest
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Towing request not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $towingRequest = TowingRequest::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:pending,accepted,in_progress,completed,cancelled'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $towingRequest->update([
                'status' => $request->status
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Towing request updated successfully',
                'data' => $towingRequest
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update towing request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
