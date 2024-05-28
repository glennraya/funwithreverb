<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Step 1: Read and Shuffle Images
        $pictures_path = database_path('photo-gallery.txt');
        $pictures_content = file_get_contents($pictures_path);
        $pic_array = explode("\n", $pictures_content);
        shuffle($pic_array);

        if (count($pic_array) < 1500) {
            throw new \Exception('Not enough unique images for all articles.');
        }

        $unique_pics = $pic_array;

        // Step 2: Create Editors (if they do not exist)
        User::factory(2)
            ->state(['role' => 'editor'])
            ->create();

        // Step 3: Fetch all editors
        $editors = User::where('role', 'editor')->get();

        // Step 4: Create 20 articles by editors, assign unique images from the images array.
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

        // Step 5: Create one 'Chief Editor' user and ten articles for the user.
        User::factory()
            ->state(['role' => 'chief-editor'])
            ->create();

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
