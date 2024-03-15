export interface Contributor {
  name: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubAuthor
  extends Pick<Contributor, 'avatar_url' | 'html_url'> {
  login: string;
}

export interface GithubResponse {
  author: GithubAuthor;
}
