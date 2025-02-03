import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { DeleteResult, Model } from 'mongoose';
import { CreateCatDto, UpdateCatDto } from './dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {
  }

  async create(createCatDto: CreateCatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findOne(id: string): Promise<CatDocument | null> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateCatDto: UpdateCatDto,
  ): Promise<CatDocument | null> {
    return this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DeleteResult | null> {
    return this.catModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<CatDocument[]> {
    return this.catModel.find().exec();
  }

  async addParent(
    child: CatDocument,
    parent: CatDocument,
  ): Promise<CatDocument | null> {
    return this.catModel
      .findByIdAndUpdate(
        child._id,
        { $push: { parents: parent } },
        { new: true },
      )
      .exec();
  }

  async deleteParent(child: Cat, parent: Cat): Promise<Cat | null> {
    return this.catModel
      .findByIdAndUpdate(
        child._id,
        { $pull: { parents: { $eq: parent._id } } },
        { new: true },
      )
      .exec();
  }
}
