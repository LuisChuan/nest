import { Controller, Get, Post, Body, Patch, Param, Delete ,Query ,Request, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  find(@Query() query) {
    console.log(query)
    return { code: 200 }
  }

  @Post()
  // @HttpCode(500)
  create(@Request() request) {
    // return this.userService.create(createUserDto);
    console.log(request.body)
    return { code: 200 }
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
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
