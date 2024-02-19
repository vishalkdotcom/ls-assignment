import type { Post, User } from "@/types/app";

export const posts: Post[] = [
  {
    id: "p-1",
    userId: "u-1",
    userName: "React Official",
    text: "React Conf is back for 2024! Join our co-hosts @Meta and @callstackio May 15-16 in Henderson, Nevada or join the free livestream.",
    likes: ["u-3", "u-4"],
    comments: [
      {
        userId: "u-2",
        userName: "Frontend News",
        text: "Great news!",
      },
    ],
  },
  {
    id: "p-2",
    userId: "u-2",
    userName: "Frontend News",
    text: "We'll provide more information as we get closer to React Conf. Stay tuned for ticket info, scholarship applications, talk proposals, sponsorship details, speaker updates, and livestream access.",
    likes: ["u-1"],
    comments: [],
  },
];

export const users: User[] = [
  {
    id: "u-1",
    email: "react@gmail.com",
    password: "Omega#47",
    firstName: "React",
    lastName: "Official",
  },
  {
    id: "u-2",
    email: "frontend@gmail.com",
    password: "Omega#47",
    firstName: "Frontend",
    lastName: "News",
  },
  {
    id: "u-3",
    email: "john@gmail.com",
    password: "Omega#47",
    firstName: "John",
    lastName: "Naveen",
  },
  {
    id: "u-4",
    email: "will@gmail.com",
    password: "Omega#47",
    firstName: "Will",
    lastName: "Smith",
  },
];
