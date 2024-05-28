<?php

namespace App\Http\Controllers;

use App\Events\DeleteArticleRequestReceived;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;

class DeleteArticleRequestController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $article = Article::find($request->id);

        $chief = User::where('role', 'chief-editor')->first();
        $editor = User::find($request->user_id);

        // Broadcast the event for the chief editor
        broadcast(new DeleteArticleRequestReceived($article, $chief, $editor));
    }
}
