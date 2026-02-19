'use client';

import PageHeader from '@/components/shared/page-header';
import Leaderboard from '@/components/shared/leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Leaderboard"
        description="See how you rank against other titans."
      />
      <Leaderboard />
    </div>
  );
}
