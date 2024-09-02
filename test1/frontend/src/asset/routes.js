
//TODO: this router should be the control for both displaying the link and the router in index.js


const routes = [
  { id: "1", name: "News", href: "/news", },
  { id: "2", name: "Contact", href: "/contact", },
  { id: "3", name: "Sign in", href: "/app", },
];

export const getRouteHrefByName = (name) => {
  const route = routes.find(route => route.name === name);
  return route ? route.href : null;
};

export default routes;
