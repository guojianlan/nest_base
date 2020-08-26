import { Injectable } from '@nestjs/common';
import { CommonService } from '@libs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from 'entities/user'
import { UserRepository } from 'repository'
import * as _ from 'lodash'
@Injectable()
export class AppService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository
  ) {

  }
  getHello() {
    return this.userRepository.customFind();
    // return this.commonService.getHello() + 'Hello World!';
  }
  createUser() {
    let user = this.userRepository.create()
    user.password = "12312323"
    user.mobile = '123123123'
    return this.userRepository.customSave(user)
  }
  async updateUser() {
    let user = await this.userRepository.findOne(38)
    user.mobile = "123222132"
    //  user.create_at = 1111
    return this.userRepository.customSave(user)
  }
  async deleteUser(id) {
    return this.userRepository.customDelete(id)
  }
  async getUser(id) {
    let user = await this.userRepository.findOne(id)
    return user
  }
}
