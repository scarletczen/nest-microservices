import { Body, Get, Inject, Injectable, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello world';
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
    return;
  }
}
