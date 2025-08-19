<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('race_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('warn_timer')->nullable();
            $table->boolean('lane_reverse')->nullable();
            $table->bigInteger('track_lanes')->nullable();
            $table->bigInteger('track_length')->nullable();
            $table->string('precision')->nullable();
            $table->string('heat_linger')->nullable();
            $table->string('full_roster')->nullable();
            $table->string('sub_division')->nullable();
            $table->string('racer_name')->nullable();
            $table->string('assigned_car_number')->nullable();
            $table->boolean('place_increments')->nullable();
            $table->string('trophies_pack_level')->nullable();
            $table->string('trophies_per_group')->nullable();
            $table->string('trophies_per_subgroup')->nullable();
            $table->boolean('one_trophy_per_race')->nullable();
            $table->boolean('exclusive_scout')->nullable();
            $table->string('scout_award_name')->nullable();
            $table->string('image_set')->nullable();
            $table->string('racing_display')->nullable();
            $table->boolean('deck_display')->nullable();
            $table->string('racer_results')->nullable();
            $table->boolean('upload_replay')->nullable();
            $table->boolean('interleave_heats')->nullable();
            $table->boolean('race_by_points')->nullable();
            $table->boolean('single_run')->nullable();
            $table->string('scoring_method')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('race_settings');
    }
};
