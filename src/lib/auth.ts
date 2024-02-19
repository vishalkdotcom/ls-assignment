"use client";

import cookieStore from "js-cookie";

import type { User, UserSession } from "@/types/app";
import { LOCALSTORAGE_ROOT_KEY, SESSION_COOKIE } from "@/utils/constants";

function getUsers() {
  const rootData = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_ROOT_KEY) ?? "{}"
  ) as {
    users: string;
  };
  const { items: users } = JSON.parse(rootData.users) as { items: User[] };
  return users;
}

export function doLogin(email: string, password: string): boolean {
  const user = getUsers().find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    const userSession: UserSession = {
      userId: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
    };
    // set session cookie
    cookieStore.set(SESSION_COOKIE, JSON.stringify(userSession));
  }
  return Boolean(user);
}

export function isEmailAlreadyUsed(email: string): boolean {
  return getUsers().some((user) => user.email === email);
}

export function isLoggedIn(): boolean {
  return Boolean(getSession());
}

export function doLogout() {
  cookieStore.remove(SESSION_COOKIE);
}

export function getSession(): UserSession | null {
  const rawSessionData = cookieStore.get(SESSION_COOKIE);
  if (rawSessionData) {
    const session = JSON.parse(rawSessionData) as UserSession;
    return session;
  }
  return null;
}
