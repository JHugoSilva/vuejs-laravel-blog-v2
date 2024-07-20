<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest) {

        $credentials = $loginRequest->only(['email', 'password']);
        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Email e/ou senha invalidos'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $loginRequest->user();
        $user->tokens()->delete();

        $token = $user->createToken('APP')->plainTextToken;

        return response()->json([
            'message' => 'Logado com successo.',
            'user' => $user,
            'access_token' => $token
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $registerRequest) {

        $user = User::create($registerRequest->all());
        return response()->json([
            'message' => 'Usuário criado com successo.',
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    public function logout(Request $request) {

        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logout Success'
        ], Response::HTTP_OK);
    }
}
