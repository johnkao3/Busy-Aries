import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    const newAttendance = new Attendance();
    newAttendance.mode = createAttendanceDto.mode;
    newAttendance.usersId = createAttendanceDto.usersId;
    newAttendance.name = createAttendanceDto.name;
    newAttendance.userId = createAttendanceDto.userId || '';
    newAttendance.cardId = createAttendanceDto.cardId || '';
    newAttendance.createdAt = new Date();

    return this.attendanceRepo.save(newAttendance);
  }

  findAll(start: Date, end: Date) {
    return this.attendanceRepo.find({
      order: {
        id: 'ASC',
      },
      where: {
        createdAt: Between(start, end),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
