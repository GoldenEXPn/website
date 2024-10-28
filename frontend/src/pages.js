
/*
    for url links
**/

const pages = new Map();
pages.set("home", {
  name: "Home",
  path: "/",
  anchorable: true,
  landing: false,
  app: false,
});
pages.set("news", {
  name: "News",
  path: "/news",
  anchorable: true,
  landing: true,
  app: false,
});
pages.set("contact", {
  name: "Contact",
  path: "/contact",
  anchorable: true,
  landing: true,
  app: false,
});
// pages.set("login", {
//   name: "Sign in",
//   path: "/auth",
//   anchorable: true,
//   landing: false,
//   app: false,
// });

// console.log(Array.from(pages.values()))
// console.log(pages.get("login"))

export default pages;