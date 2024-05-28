<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pictures_path = database_path('photo-gallery.txt');
        $pictures_content = file_get_contents($pictures_path);
        $pic_array = explode("\n", $pictures_content);
        shuffle($pic_array);

        if (count($pic_array) < 1500) {
            throw new \Exception('Not enough unique images for all articles.');
        }

        $unique_pics = $pic_array;
        $editors = User::where('role', 'editor')->get();

        foreach ($editors as $editor) {
            for ($i = 0; $i < 20; $i++) {
                if (empty($unique_pics)) {
                    throw new \Exception('Ran out of unique images.');
                }

                $article = Article::factory()->make([
                    'article_image' => array_shift($unique_pics),
                    'user_id' => $editor->id,
                ]);

                $article->save();
            }
        }

        $chiefs = User::where('role', 'chief-editor')->get();
        foreach ($chiefs as $chief) {
            for ($i = 0; $i < 10; $i++) {
                if (empty($unique_pics)) {
                    throw new \Exception('Ran out of unique images.');
                }

                $article = Article::factory()->make([
                    'article_image' => array_shift($unique_pics),
                    'user_id' => $chief->id,
                ]);

                $article->save();
            }
        }
    }
}
