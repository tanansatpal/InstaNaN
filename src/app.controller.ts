import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/users/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getUsers(): string {
    return this.appService.getHello();
  }

  @Post()
  addUser(@Body() body: CreateDto) {
    return body;
  }
}
