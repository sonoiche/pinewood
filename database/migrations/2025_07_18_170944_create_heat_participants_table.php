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
        Schema::create('heat_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('heat_id')->constrained('heats')->onDelete('cascade');
            $table->integer('heat_number')->nullable();
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
            $table->integer('lane_number')->nullable();
            $table->decimal('finish_time', 6, 2)->nullable();
            $table->integer('placement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heat_participants');
    }
};
