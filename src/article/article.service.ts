import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'repository'
import { InjectRepository } from '@nestjs/typeorm';
import { PAGE_SIZE } from 'constants/index';
@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleRepository) private readonly articleRepository: ArticleRepository
    ) { }
    getArticle() {
        return this.articleRepository.customFind({
            relations: ['category', 'tags'],
            skip: 0 * PAGE_SIZE,
            take: PAGE_SIZE
        })
    }
    getArticleToCategory(id) {
        return this.articleRepository.customFind({
            relations: ['category', 'tags'],
            where: {
                'category_id': id,
            },
        })
    }
    async getArticleItem(id) {
        let result = await this.articleRepository.findOne({
            relations: ['category'],
            where: {
                id,
            }
        })
        let tag = await result.tags;

        (result as any).tagsa = tag
        return result
    }

}
