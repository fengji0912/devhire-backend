import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  // 获取所有职位
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // 根据ID获取职位
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  // 创建职位（需要鉴权）
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: { title: string; description: string }) {
    return this.jobsService.create(body.title, body.description);
  }

  // 删除职位（需要鉴权）
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
