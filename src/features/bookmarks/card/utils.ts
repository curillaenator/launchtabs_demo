const HTTP_LINK_RE = /^http:\/\/.*/;
const HTTPS_LINK_RE = /^https:\/\/.*/;
const NOTES_ROUTE_RE = /^\/notes\/([A-Za-z0-9]+)$/;

const getValidatedHref = (bookmarkLink?: string) => {
  if (!bookmarkLink) return '/';

  if (NOTES_ROUTE_RE.test(bookmarkLink) || HTTP_LINK_RE.test(bookmarkLink)) return bookmarkLink;

  return new URL(HTTPS_LINK_RE.test(bookmarkLink) ? bookmarkLink : `https://${bookmarkLink}`).href;
};

export { getValidatedHref };
