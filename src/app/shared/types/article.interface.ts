export interface ArticleInterface{
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    titles: string;
    updatedAt: string;

    // TODO add author interface
}