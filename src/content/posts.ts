export type Post = {
  id: string;
  username: string;
  postText: string;
  likes: number;
  comments: UserComment[];
};

export type UserComment = {
  username: string;
  commentText: string;
};

export const posts: Post[] = [
  {
    id: "p-1",
    username: "React Official",
    postText:
      "React Conf is back for 2024! Join our co-hosts @Meta and @callstackio May 15-16 in Henderson, Nevada or join the free livestream.",
    likes: 12,
    comments: [
      {
        username: "Dan Williams",
        commentText: "Great news!",
      },
    ],
  },
  {
    id: "p-2",
    username: "Chris Watson",
    postText:
      "We'll provide more information as we get closer to React Conf. Stay tuned for ticket info, scholarship applications, talk proposals, sponsorship details, speaker updates, and livestream access.",
    likes: 20,
    comments: [],
  },
];
