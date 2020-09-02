import { Article } from 'entities'
import { EntityRepository, Repository, ObjectID } from 'typeorm'
import { CustomRepository } from './custom';
@EntityRepository(Article)
export class ArticleRepository extends CustomRepository<Article> { }