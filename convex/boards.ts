import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Temporarily skip authentication for testing
        // const identity = await ctx.auth.getUserIdentity();
        // if (!identity) {
        //     throw new Error("Unauthorized");
        // }

        if (args.favorites) {
            const favoriteBoards = await ctx.db
                .query("userFavorites")
                .withIndex("by_user_org", (q) =>
                    q.eq("userId", "test-user").eq("orgId", args.orgId)
                )
                .collect();

            const boards = [];
            for (const favorite of favoriteBoards) {
                const board = await ctx.db.get(favorite.boardId);
                if (board) {
                    boards.push({
                        ...board,
                        isFavorite: true,
                    });
                }
            }

            return boards;
        }

        const title = args.search as string;

        let boards = [];

        if (title) {
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q) =>
                    q.search("title", title).eq("orgId", args.orgId)
                )
                .collect();
        } else {
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();
        }

        const boardsWithFavorites = [];
        for (const board of boards) {
            const favorite = await ctx.db
                .query("userFavorites")
                .withIndex("by_user_board", (q) =>
                    q.eq("userId", "test-user").eq("boardId", board._id)
                )
                .unique();

            boardsWithFavorites.push({
                ...board,
                isFavorite: !!favorite,
            });
        }

        return boardsWithFavorites;
    },
});
