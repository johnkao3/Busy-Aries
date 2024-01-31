import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendancesModule } from './attendances/attendances.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT || 5432),
      username: process.env.PG_USER || 'username',
      password: process.env.PG_PASSWORD || 'password',
      database: process.env.PG_DATABASE || 'database',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    AttendancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    console.log('[AppModule]: onModuleInit!');
    const user = await this.usersService.findByUsername('super-aries');
    if (!user) {
      console.log('Init Super Admin');
      await this.usersService.create({
        username: 'super-aries',
        password: 'password',
        legalName: 'Aries',
        nickName: 'aries',
        role: 'ADMIN',
        isActive: true,
      });
    } else {
      console.log('Super Admin existed');
    }
  }
}

// export class AppModule {}
