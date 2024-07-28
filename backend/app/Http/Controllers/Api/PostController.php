<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Http\Requests\PostRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {

        $query = $request->get('query');

        $data = DB::table('posts');

        if (!is_null($query)) {
            $posts = $data->where('title', 'like', '%' . $query . '%');

            return response()->json($posts->paginate(3), Response::HTTP_OK);
        }

        return response()->json(PostResource::collection($data->paginate(3))->resource, Response::HTTP_OK);
    }

    public function store(PostRequest $postRequest)
    {

        if ($postRequest->hasFile('image')) {
            // Get filename with the extension
            $filenameWithExt = $postRequest->file('image')->getClientOriginalName();
            // Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $postRequest->file('image')->getClientOriginalExtension();
            // Filename to store
            $fileNameToStore = auth()->user()->id . '_' . time() . '.' . $extension;
            // Upload Image
            $postRequest->file('image')->storeAs('public/images', $fileNameToStore);
        } else {
            $fileNameToStore = null;
        }

        $post = Post::create([
            'title' => $postRequest->title,
            'post_content' => $postRequest->post_content,
            'image' => $fileNameToStore
        ]);

        return response()->json([
            'message' => 'Post criado com sucesso.',
            'post' => $post
        ], Response::HTTP_CREATED);
    }

    public function update(PostUpdateRequest $postUpdateRequest, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => "Post {$id} não localizado.",
                'status' => false
            ], Response::HTTP_NOT_FOUND);
        }

        if ($postUpdateRequest->hasFile('image')) {

            $fileExists = public_path("storage/images/{$post->image}");

            if (File::exists($fileExists)) {
                File::delete($fileExists);
            }

            // Get filename with the extension
            $filenameWithExt = $postUpdateRequest->file('image')->getClientOriginalName();
            // Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $postUpdateRequest->file('image')->getClientOriginalExtension();
            // Filename to store
            $fileNameToStore = auth()->user()->id . '_' . time() . '.' . $extension;
            // Upload Image
            $postUpdateRequest->file('image')->storeAs('public/images', $fileNameToStore);
        } else {
            $fileNameToStore = $post->image;
        }

        $post = $post->update([
            'title' => $postUpdateRequest->title,
            'post_content' => $postUpdateRequest->post_content,
            'image' => $fileNameToStore
        ]);


        return response()->json([
            'message' => 'Post atualizado com sucesso.',
            'status' => $post
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post não localizado.',
                'status' => false
            ], Response::HTTP_NOT_FOUND);
        }

        $fileExists = public_path("storage/images/{$post->image}");

        if (File::exists($fileExists)) {
            File::delete($fileExists);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deletado.',
            'status' => true
        ],
        Response::HTTP_OK);
    }

    public function addImage(Request $request) {

        $post = Post::find($request->id);

        if (!$post) {
            return response()->json([
                'message' => "Post {$request->id} não localizado.",
                'status' => false
            ], Response::HTTP_NOT_FOUND);
        }

        if ($request->hasFile('image')) {

            $fileExists = public_path("storage/images/{$post->image}");

            if (File::exists($fileExists)) {
                File::delete($fileExists);
            }

            // Get filename with the extension
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            // Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $request->file('image')->getClientOriginalExtension();
            // Filename to store
            $fileNameToStore = auth()->user()->id . '_' . time() . '.' . $extension;
            // Upload Image
            $request->file('image')->storeAs('public/images', $fileNameToStore);
        } else {
            $fileNameToStore = $post->image;
        }

        $post->update([
            'id' => $request->id,
            'image' => $fileNameToStore
        ]);

        return response()->json([
            'message' => 'Upload the image post.'
        ], Response::HTTP_OK);

    }
}
