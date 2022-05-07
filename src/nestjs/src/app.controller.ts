import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Category } from '@fc/backend-admin-catalog/category/domain'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Category ==>', Category)
    return this.appService.getHello()
  }
}
