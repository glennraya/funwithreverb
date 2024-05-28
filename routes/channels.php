<?php

use Illuminate\Support\Facades\Broadcast;

// This is the private channel users can subscribe to.
Broadcast::channel('management.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
