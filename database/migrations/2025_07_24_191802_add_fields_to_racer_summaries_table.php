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
        Schema::table('race_result_summaries', function (Blueprint $table) {
            $table->integer('category_id')->nullable()->after('event_id');
            $table->integer('best_time')->nullable()->after('average_time');
            $table->integer('races_count')->nullable()->after('rank');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('race_result_summaries', function (Blueprint $table) {
            $table->dropColumn('category_id');
            $table->dropColumn('best_time');
            $table->dropColumn('races_count');
        });
    }
};
