export interface Comment {
    id: string;
    articleId: string;
    comment: string;
    authorCommentUrl: string;
    authorCommentId: string;
    authorCommentDisplayName: string;
}

export type categories = 'science' | 'studying' | 'films' | 'literature' | 'other';

export interface Article {
    id: string;
    authorId: string;
    displayName: string;
    authorAvatarUrl?: string;
    authorEmail: string;
    title: string;
    description: string;
    imageUrl: string;
    category: categories;
    created: number;
    comments: Comment[];
}