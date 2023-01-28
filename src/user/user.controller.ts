import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpCode
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger'
@Controller('user')
@ApiTags('用户')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '测试admin',
    description: '请求该接口需要amdin权限'
  })
  @ApiParam({ name: 'id', description: '用户id', required: true })
  @ApiQuery({ name: 'id', description: '用户id' })
  find(@Query() query) {
    console.log(query)
    return { code: 200 }
  }

  @Post()
  // @HttpCode(500)
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto)
    // console.log(request.body)
    // return { code: 200 }
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
