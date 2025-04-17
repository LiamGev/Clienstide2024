import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Biome as BiomeModel, BiomeDocument } from './schemas/biome.schema';
import { Enemy as EnemyModel, EnemyDocument } from '../enemy/schemas/enemy.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { biomeCypher } from './neo4j/biome.cypher';
import { Biome, Enemy } from '@project/libs/shared/api';
import { BiomeDto } from './schemas/biome.dto';
import { EnemyDto } from '../enemy/schemas/enemy.dto';
import { EnemyType, EnemyClass } from '@project/libs/shared/api';

@Injectable()
export class BiomeService {
  constructor(
    @InjectModel(BiomeModel.name) private readonly biomeModel: Model<BiomeDocument>,
    @InjectModel(EnemyModel.name) private readonly enemyModel: Model<EnemyDocument>,
    private readonly neo4jService: Neo4jService,
  ) {}

  async getAll(): Promise<BiomeDto[]> {
    const biomes = await this.biomeModel.find().populate('commonEnemies').exec();
    
    return biomes.map(biome => {
      const biomeObj = biome.toObject();
  
      return {
        ...biomeObj,
        commonEnemies: (biomeObj.commonEnemies as any[]).map(enemy => ({
          _id: enemy._id,
          name: enemy.name,
          type: enemy.type,
          health: enemy.health,
          damage: enemy.damage,
          class: enemy.class,
          createdBy: enemy.createdBy,
        }))
      };
    });
  }
  

  async getBiomeByName(name: string): Promise<{ results: BiomeDto }> {
    const biome = await this.biomeModel.findOne({ name }).populate('commonEnemies').exec();

    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }

    return {
      results: {
        ...biome.toObject(),
        commonEnemies: (biome.commonEnemies as unknown as EnemyDto[]).map(enemy => ({
          _id: enemy._id,
          name: enemy.name,
          type: enemy.type as EnemyType,
          health: enemy.health,
          damage: enemy.damage,
          class: enemy.class as EnemyClass,
          createdBy: enemy.createdBy,
        })),
      },
    };
  }

  async create(newBiome: BiomeDto, currentUserId: string): Promise<BiomeDto> {
    const biomeWithCreator = {
      ...newBiome,
      createdBy: currentUserId,
    };
  
    const createdBiome = new this.biomeModel(biomeWithCreator);
    await createdBiome.save();
  
    
    const enemyDocs = await this.enemyModel.find({
      _id: { $in: createdBiome.commonEnemies }
    }).exec();
    const enemyNames = enemyDocs.map(enemy => enemy.name);
  
    
    await this.neo4jService.write(biomeCypher.addBiome, {
      name: createdBiome.name,
      description: createdBiome.description,
      difficulty: createdBiome.difficulty,
      commonEnemies: enemyNames,
    });
  
    
    for (const enemyName of enemyNames) {
      await this.neo4jService.write(biomeCypher.addSpawnRelation, {
        enemyName,
        biomeName: createdBiome.name,
      });
    }
  
    return {
      ...createdBiome.toObject(),
      commonEnemies: [],
    };
  }
  
  

  async updateBiome(id: string, updateData: Partial<BiomeDto>, currentUserId: string): Promise<BiomeDto> {
    const biome = await this.biomeModel.findById(id).exec();
  
    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }
  
    if (biome.createdBy.toString() !== currentUserId) {
      throw new ForbiddenException('You are not authorized to update this biome');
    }
  
    const updatedBiome = await this.biomeModel.findByIdAndUpdate(id, updateData, { new: true }).populate('commonEnemies').exec();
  
    const enemyDocs = await this.enemyModel.find({
      _id: { $in: updatedBiome.commonEnemies }
    }).exec();
    const enemyNames = enemyDocs.map(enemy => enemy.name);
  
    
    await this.neo4jService.write(`
      MATCH (b:Biome { name: $name })
      OPTIONAL MATCH (b)-[r:HAS_ENEMY]->()
      DELETE r
    `, { name: updatedBiome.name });
  
    await this.neo4jService.write(`
      MATCH (e:Enemy)-[r:SPAWNS_IN]->(b:Biome { name: $name })
      DELETE r
    `, { name: updatedBiome.name });
  
    await this.neo4jService.write(biomeCypher.addBiome, {
      name: updatedBiome.name,
      description: updatedBiome.description,
      difficulty: updatedBiome.difficulty,
      commonEnemies: enemyNames,
    });
  
    for (const enemyName of enemyNames) {
      await this.neo4jService.write(biomeCypher.addSpawnRelation, {
        enemyName,
        biomeName: updatedBiome.name,
      });
    }
  
    return {
      ...updatedBiome.toObject(),
      commonEnemies: (updatedBiome.commonEnemies as any[]).map((enemy: any) => enemy._id.toString()),
    };
  }
  
  async deleteBiome(id: string, currentUserId: string): Promise<any> {
    const biome = await this.biomeModel.findById(id).exec();
  
    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }
  
    // Check eigenaar
    if (biome.createdBy.toString() !== currentUserId) {
      throw new ForbiddenException('You are not authorized to delete this biome');
    }
  
    await this.biomeModel.findByIdAndDelete(id).exec();
  
    await this.neo4jService.write(biomeCypher.removeBiome, {
      name: biome.name,
    });
  
    return {
      message: 'Biome successfully deleted',
      id: id,
    };
  }

  async addSpawnRelation(enemyName: string, biomeName: string) {
    return this.neo4jService.write(
      biomeCypher.addSpawnRelation,
      { enemyName, biomeName }
    );
  }

  async getBiomeById(id: string): Promise<BiomeDto> {
    const biome = await this.biomeModel.findById(id).populate('commonEnemies').exec();
    
    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }
  
    return {
      ...biome.toObject(),
      commonEnemies: (biome.commonEnemies as any[]).map((enemy: any) => enemy._id.toString()),
    };
  }
  
}
