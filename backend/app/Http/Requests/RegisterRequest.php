<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required','string'],
            'email' => ['required','email',Rule::unique(User::class, 'email')],
            'password' => ['required','min:6']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O campo Nome e obrigatório.',
            'email.required' => 'O campo Email e obrigatório.',
            'email.email' => 'O campo Email deve ser do tipo email.',
            'email.unique' => 'Email já cadastrado.',
            'password.required' => 'O campo Senha e obrigatório.',
            'password.min' => 'O campo Senha deve conter o mínimo de 6 digitos.',
        ];
    }
}
