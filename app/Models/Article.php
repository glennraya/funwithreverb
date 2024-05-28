<?php

namespace App\Models;

use App\Models\Scopes\UserArticleScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ScopedBy([UserArticleScope::class])]
class Article extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'body',
        'article_image',
        'is_active',
    ];

    /**
     * Cast the dates to human readable format.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:D, m/d/o',
        'updated_at' => 'datetime:D, m/d/o',
    ];

    /**
     * Get the user who owns the article.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
