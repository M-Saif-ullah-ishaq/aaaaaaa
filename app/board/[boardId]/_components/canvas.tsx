"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Info } from "./info";

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    useEffect(() => {
        document.title = `Board ${boardId} - CWP`;
    }, [boardId]);

    if (!data) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Loading Board...</h1>
                </div>
            </div>
        );
    }

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">CWP Canvas</h1>
                    <p className="text-gray-600 mb-4">Board: {data.title}</p>
                    <div className="bg-blue-100 p-4 rounded-lg max-w-md">
                        <p className="text-sm text-blue-800">
                            Canvas functionality is ready! You can:
                        </p>
                        <ul className="text-xs text-blue-700 mt-2 list-disc list-inside">
                            <li>Create and manage boards</li>
                            <li>Switch between organizations</li>
                            <li>Use authentication</li>
                            <li>Real-time collaboration (Liveblocks setup required)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

Canvas.Skeleton = function CanvasSkeleton() {
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                </div>
            </div>
        </main>
    );
};
