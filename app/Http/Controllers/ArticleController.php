<?php

namespace App\Http\Controllers;

use App\Events\ArticleDeleted;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function destroy(Request $request)
    {
        $article = Article::findOrFail($request->id);
        $article_data = $article->toArray();
        $article_user = $article->user;

        $article->delete();

        broadcast(new ArticleDeleted($article_data, $article_user));
    }
}
