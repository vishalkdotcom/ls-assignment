export type Post = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  likes: string[];
  comments: PostComment[];
};

export type PostComment = {
  id: string;
  text: string;
  userId: string;
  userName: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserSession = {
  userId: string;
  fullName: string;
};
