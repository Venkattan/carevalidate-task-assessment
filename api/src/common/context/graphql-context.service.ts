import { Injectable } from '@nestjs/common';
import { DataLoaderService } from '../dataloader/dataloader.service';

@Injectable()
export class GraphQLContextService {
  constructor(private dataLoaderService: DataLoaderService) {}

  createContext(request: any, connection?: any) {
    const context = {
      req: request || connection?.context?.req,
      dataLoaders: this.dataLoaderService,
    };

    // For subscriptions, we need to pass the request from the connection context
    if (connection) {
      context.req = connection.context.req;
    }

    return context;
  }
}
