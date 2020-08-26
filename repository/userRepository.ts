import { User } from 'entities'
import { EntityRepository, Repository, ObjectID } from 'typeorm'
import { CustomRepository } from './custom';
@EntityRepository(User)
export class UserRepository extends CustomRepository<User> {}