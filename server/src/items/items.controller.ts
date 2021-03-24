import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./schemas/item.schema";
import { PaginatedItems } from "./dto/paginated-items.dto";

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // @Post()
  // create(@Body() createItemDto: CreateItemDto): Promise<Item> {
  //   return this.itemsService.create(createItemDto);
  // }

  @Get()
  findAll(@Query() query: any): Promise<PaginatedItems> {
    if (query.page <= 0 || query.limit <= 0) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
    return this.itemsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  // @Put(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateItemDto: UpdateItemDto,
  // ): Promise<Item> {
  //   return this.itemsService.update(id, updateItemDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.itemsService.remove(id);
  // }
}
