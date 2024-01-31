import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async findAll(@Query('start') start: string, @Query('end') end: string) {
    const startDate = new Date(`${start} 00:00:00`);
    const endDate = new Date(`${end} 23:59:59`);
    const result = await this.attendancesService.findAll(startDate, endDate);
    return {
      content: result,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendancesService.update(+id, updateAttendanceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
