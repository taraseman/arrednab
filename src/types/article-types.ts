export interface Comment {
    id: string;
    articleId: string;
    authorId: string;
    comment: string;
    authorCommentUrl: string;
    authorCommentDisplayName: string;
}

export type categories = 'science' | 'studying' | 'films' | 'literature' | 'other';

export interface Article {
    id: string;
    authorId: string;
    title: string;
    description: string;
    imageUrl: string;
    category: categories;
    created: number;
    comments: Comment[];
}