"use client";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    // Temporarily use a mock organization for testing
    const mockOrgId = "test-org-id";

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-5">
            <BoardList orgId={mockOrgId} query={searchParams} />
        </div>
    );
};

export default DashboardPage;
