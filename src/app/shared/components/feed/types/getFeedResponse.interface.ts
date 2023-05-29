import { ArticleInterface } from "src/app/shared/types/article.interface";

export interface GetFeedResponseInterface{
    articles: Array<ArticleInterface>
    articlesCount: number;
}