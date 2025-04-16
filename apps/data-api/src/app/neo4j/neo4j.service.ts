import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import neo4j, { Driver, Result, Session } from 'neo4j-driver';
import { NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(@Inject(NEO4J_DRIVER) private readonly driver: Driver) {}

  getReadSession(database?: string): Session {
    return this.driver.session({
      database: database || process.env.NEO4J_DATABASE,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  getWriteSession(database?: string): Session {
    return this.driver.session({
      database: database || process.env.NEO4J_DATABASE,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  async read(cypher: string, params: Record<string, any>, database?: string): Promise<Result> {
    const session = this.getReadSession(database);
    try {
      return await session.run(cypher, params);
    } finally {
      await session.close();
    }
  }

  async write(cypher: string, params: Record<string, any>, database?: string): Promise<Result> {
    const session = this.getWriteSession(database);
    try {
      return await session.run(cypher, params);
    } finally {
      await session.close();
    }
  }

  async onApplicationShutdown() {
    await this.driver.close();
  }
}
