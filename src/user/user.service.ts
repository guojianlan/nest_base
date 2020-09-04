import { Injectable } from '@nestjs/common';
import { UserRepository } from 'repository';
import { User } from 'entities';
import { Pagination } from 'type/custom';
import { CommonException } from 'error';
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
    async delete(id: number) {
        let result = await this.userRepository.customFindOne(id);
        if (result == undefined) {
            throw new CommonException('文章不存在，删除失败')
        }
        //删除多对多关系
        // result.tags = [];
        return this.userRepository.customSoftDelete(result);
    }
    async reStore(id: number) {
        return this.userRepository.customReStore(id)
    }
}
