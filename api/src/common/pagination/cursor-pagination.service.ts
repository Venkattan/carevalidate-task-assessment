import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: string;

  @Field({ nullable: true })
  endCursor?: string;
}

@ObjectType()
export class Edge<T> {
  @Field()
  cursor: string;

  node: T;
}

export interface PaginationArgs {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface CursorBasedConnection<T> {
  edges: Array<{ node: T; cursor: string }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
  totalCount?: number;
}

export class CursorPaginationService {
  // Enhanced cursor-based pagination with better performance
  static async paginate<T extends { id: string; createdAt: Date }>(
    queryFn: (args: any) => Promise<T[]>,
    countFn: () => Promise<number>,
    args: PaginationArgs & { orderBy?: any; where?: any },
    options: {
      maxLimit?: number;
      defaultLimit?: number;
      cursorField?: string;
    } = {}
  ): Promise<CursorBasedConnection<T>> {
    const {
      first,
      after,
      last,
      before,
      orderBy = { createdAt: 'desc' },
      where = {},
    } = args;

    const {
      maxLimit = 100,
      defaultLimit = 10,
      cursorField = 'createdAt',
    } = options;

    // Validate pagination arguments
    if (first && last) {
      throw new Error('Cannot provide both first and last');
    }

    if (after && before) {
      throw new Error('Cannot provide both after and before');
    }

    // Determine the limit and direction
    const limit = Math.min(
      first || last || defaultLimit,
      maxLimit
    );

    const isForward = first !== undefined;
    const cursor = after || before;

    // Build the query arguments
    let queryArgs: any = {
      where,
      orderBy,
      take: limit + 1, // Fetch one extra to determine if there are more pages
    };

    // Add cursor-based filtering
    if (cursor) {
      const decodedCursor = this.decodeCursor(cursor);
      const cursorCondition = isForward 
        ? { [cursorField]: { lt: decodedCursor.value } }
        : { [cursorField]: { gt: decodedCursor.value } };

      queryArgs.where = {
        ...queryArgs.where,
        ...cursorCondition,
      };
    }

    // Execute the query
    const [items, totalCount] = await Promise.all([
      queryFn(queryArgs),
      countFn(),
    ]);

    // Determine if there are more pages
    const hasMore = items.length > limit;
    if (hasMore) {
      items.pop(); // Remove the extra item
    }

    // Reverse items if querying backwards
    if (!isForward) {
      items.reverse();
    }

    // Create edges
    const edges = items.map(item => ({
      node: item,
      cursor: this.encodeCursor(item, cursorField),
    }));

    // Determine page info
    const hasNextPage = isForward ? hasMore : !!before;
    const hasPreviousPage = isForward ? !!after : hasMore;

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
    };

    return {
      edges,
      pageInfo,
      totalCount,
    };
  }

  // Time-based cursor for better performance on large datasets
  static async paginateByTime<T extends { id: string; createdAt: Date }>(
    queryFn: (args: any) => Promise<T[]>,
    countFn: () => Promise<number>,
    args: PaginationArgs & { orderBy?: any; where?: any },
    options: {
      maxLimit?: number;
      defaultLimit?: number;
    } = {}
  ): Promise<CursorBasedConnection<T>> {
    return this.paginate<T>(queryFn, countFn, args, {
      ...options,
      cursorField: 'createdAt',
    });
  }

  // ID-based cursor for consistent ordering
  static async paginateById<T extends { id: string; createdAt: Date }>(
    queryFn: (args: any) => Promise<T[]>,
    countFn: () => Promise<number>,
    args: PaginationArgs & { orderBy?: any; where?: any },
    options: {
      maxLimit?: number;
      defaultLimit?: number;
    } = {}
  ): Promise<CursorBasedConnection<T>> {
    return this.paginate<T>(queryFn, countFn, args, {
      ...options,
      cursorField: 'id',
    });
  }

  // Encode cursor with both timestamp and ID for uniqueness
  private static encodeCursor(item: any, field: string): string {
    const value = item[field];
    const cursor = {
      value: value instanceof Date ? value.toISOString() : value,
      id: item.id,
    };
    return Buffer.from(JSON.stringify(cursor)).toString('base64');
  }

  // Decode cursor
  private static decodeCursor(cursor: string): { value: any; id: string } {
    try {
      const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString());
      return {
        value: decoded.value,
        id: decoded.id,
      };
    } catch (error) {
      throw new Error('Invalid cursor format');
    }
  }

  // Offset-based pagination fallback for simple cases
  static async paginateOffset<T>(
    queryFn: (args: any) => Promise<T[]>,
    countFn: () => Promise<number>,
    args: {
      limit?: number;
      offset?: number;
      orderBy?: any;
      where?: any;
    },
    options: {
      maxLimit?: number;
      defaultLimit?: number;
    } = {}
  ): Promise<{
    items: T[];
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const {
      limit = options.defaultLimit || 10,
      offset = 0,
      orderBy = { createdAt: 'desc' },
      where = {},
    } = args;

    const actualLimit = Math.min(limit, options.maxLimit || 100);

    const [items, totalCount] = await Promise.all([
      queryFn({
        where,
        orderBy,
        take: actualLimit,
        skip: offset,
      }),
      countFn(),
    ]);

    return {
      items,
      totalCount,
      hasNextPage: offset + actualLimit < totalCount,
      hasPreviousPage: offset > 0,
    };
  }
}
