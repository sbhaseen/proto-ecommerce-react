import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateItemDto } from "./dto/create-item.dto";
import { PaginatedItems } from "./dto/paginated-items.dto";
import { PaginationQuery } from "./dto/pagination-query.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item, ItemDocument } from "./schemas/item.schema";

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(query?: PaginationQuery): Promise<PaginatedItems> {
    const page = +query.page || 1;
    const limit = +query.limit || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results: PaginatedItems = {};

    try {
      const count = await this.itemModel.countDocuments({});

      if (endIndex < count) {
        results.next = page + 1;
      }

      results.limit = limit;
      results.total = {
        items: count,
        pages: Math.ceil(count / limit),
      };

      if (count > 0) {
        if (startIndex > 0 && page <= results.total.pages) {
          results.previous = page - 1;
        } else if (page > results.total.pages) {
          results.previous = results.total.pages;
        }
      }
    } catch (error) {
      return error;
    }

    try {
      const data = await this.itemModel
        .find()
        .sort({ productName: 1 })
        .limit(limit)
        .skip(startIndex);
      results.data = data;

      return results;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, updateItemDto, {
      new: true,
      omitUndefined: true,
    });
  }

  async remove(id: string) {
    return await this.itemModel.findByIdAndDelete(id);
  }
}
