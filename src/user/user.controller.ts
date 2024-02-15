import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
   createUser(@Body() dot:UserDto){
    return this.userService.createUser(dot);
  }

  @Get('get-all-users')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('get-user/:id')
   findOneUser(@Param('id') id: string) {
     return this.userService.findOne(parseInt(id, 10));
  
  }
  @Put('update-user/:id')
   updateUser(@Param('id') id: string, @Body() dto: any){
    return this.userService.update(parseInt(id, 10), dto);
  }

  @Delete('delete-user/:id')
    deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(parseInt(id, 10));
  }}