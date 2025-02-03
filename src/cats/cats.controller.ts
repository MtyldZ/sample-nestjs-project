import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import {
  CreateCatDto,
  UpdateCatDto,
  RemoveParentOfCatDto,
  SetParentOfCatDto,
} from './dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Post('parent/:childId/:parentId')
  async addParent(@Param() setParentOfCatDto: SetParentOfCatDto) {
    const { childId, parentId } = setParentOfCatDto;
    const child = await this.catsService.findOne(childId);
    const parent = await this.catsService.findOne(parentId);
    if (!child || !parent) {
      throw new BadRequestException('Invalid arguments');
    }
    if (child.parents.find((x) => x._id.toString() === parent._id.toString())) {
      throw new BadRequestException('Parent already exists');
    }
    return this.catsService.addParent(child, parent);
  }

  @Delete('parent/:childId/:parentId')
  async deleteParent(@Param() removeParentOfCatDto: RemoveParentOfCatDto) {
    const { childId, parentId } = removeParentOfCatDto;
    const child = await this.catsService.findOne(childId);
    const parent = await this.catsService.findOne(parentId);
    if (!child || !parent) {
      throw new BadRequestException('Invalid arguments');
    }
    if (
      !child.parents.find((x) => x._id.toString() === parent._id.toString())
    ) {
      throw new BadRequestException('Parent does not exists');
    }

    return this.catsService.deleteParent(child, parent);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat | null> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
