import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Biome as BiomeModel, BiomeDocument } from './schemas/biome.schema';
import { Enemy as EnemyModel, EnemyDocument } from '../enemy/schemas/enemy.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { biomeCypher } from './neo4j/biome.cypher';
import { Biome, Enemy } from '@avans-nx-workshop/shared/api';
import { BiomeDto } from './schemas/biome.dto';
import { EnemyDto } from '../enemy/schemas/enemy.dto';

@Injectable()
export class BiomeService {
  constructor(
    @InjectModel(BiomeModel.name) private readonly biomeModel: Model<BiomeDocument>,
    @InjectModel(EnemyModel.name) private readonly enemyModel: Model<EnemyDocument>,
    private readonly neo4jService: Neo4jService,
  ) {}

    async getAll(): Promise<{ results: BiomeDto[] }> {
    const biomes = await this.biomeModel.find().populate('commonEnemies').exec();
    const transformedBiomes = biomes.map(biome => ({
      ...biome.toObject(),
      commonEnemies: (biome.commonEnemies as unknown as EnemyDto[]).map(enemy => enemy._id),
    }));

    return { results: transformedBiomes };
  }

  async getBiomeByName(name: string): Promise<{ results: BiomeDto }> {
    const biome = await this.biomeModel.findOne({ name }).populate('commonEnemies').exec();

    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }

    return {
      results: {
        ...biome.toObject(),
        commonEnemies: (biome.commonEnemies as unknown as EnemyDto[]).map(enemy => enemy._id.toString()),
      },
    };
  }

  async create(newBiome: BiomeDto): Promise<BiomeDto> {
    const createdBiome = new this.biomeModel(newBiome);
    await createdBiome.save();

    await this.neo4jService.write(biomeCypher.addBiome, {
      name: createdBiome.name,
      description: createdBiome.description,
      difficulty: createdBiome.difficulty,
    });

    return {
      ...createdBiome.toObject(),
      commonEnemies: [],
    };
  }

  async updateBiome(id: string, updateData: Partial<BiomeDto>): Promise<BiomeDto> {
    const biome = await this.biomeModel
      .findOneAndUpdate({ _id: id }, updateData, { new: true })
      .populate('commonEnemies')
      .exec();
  
    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }
  
    await this.neo4jService.write(biomeCypher.updateBiome, {
      name: biome.name,
      description: biome.description,
      difficulty: biome.difficulty,
    });
  
    return {
      ...biome.toObject(),
      commonEnemies: (biome.commonEnemies as any[]).map((enemy: any) => enemy._id.toString()),
    };
  }
  

  async deleteBiome(id: string): Promise<any> {
    const biome = await this.biomeModel.findByIdAndDelete(id).exec();
  
    if (!biome) {
      throw new HttpException('Biome not found', 404);
    }
  
    await this.neo4jService.write(biomeCypher.removeBiome, {
      name: biome.name,
    });
  
    return {
      message: 'Biome successfully deleted',
      id: id,
    };
  }
  

}
