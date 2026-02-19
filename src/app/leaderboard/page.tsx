'use client';

import Leaderboard from '@/components/shared/leaderboard';
import PageHeader from '@/components/shared/page-header';

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="See how you rank against other titans."
      />
      <Leaderboard />
    </div>
  );
}
