import { Injectable } from '@nestjs/common';
import { UserRepository } from 'repository';
import { User } from 'entities';
import { Pagination } from 'type/custom';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
    async findAll({
        page,
        pageSize,
    }): Promise<Pagination<User>> {
        let [results, count] = await this.userRepository.customFindAndCount()
        return {
            page,
            pageSize,
            count,
            results,
        }
    }
    findById(id: string) {
        return this.userRepository.createQueryBuilder('u')
            .where({
                id
            })
            .addSelect('u.password')
            .getOne();
    }
    getUserByName(name: string) {
        return this.userRepository.customFind({
            where: {
                mobile: name
            }
        })
    }
}
