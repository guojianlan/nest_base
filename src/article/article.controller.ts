import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
@Controller('article')
export class ArticleController {
    constructor(private readonly service: ArticleService) { }
    @Get()
    getArticle() {
        return this.service.getArticle()
    }
    @Get("/category/:id")
    getArticleToCategory(@Param('id') id) {
        return this.service.getArticleToCategory(id)
    }
    @Get(":id")
    getArticleItem(@Param('id') id) {
        return this.service.getArticleItem(id)
    }
}
