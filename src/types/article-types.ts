export interface Comment {
    id: string;
    created: string;
    authorId: string;
    message: string;
}

export type Categories = 'science' | 'studying' | 'films' | 'literature' | 'other';

export interface Article {
    id: string;
    authorId: string;
    title: string;
    description: string;
    imageUrl: string;
    category: Categories;
    created: number;
    comments: Comment[];
}