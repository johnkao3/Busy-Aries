import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return {
      user: req.user,
      message: 'Login Success',
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.send({
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      });
    });
  }
}
