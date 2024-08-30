export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/" && from.path !== "/") {
    return navigateTo(from.fullPath);
  } else if (to.path === "/" && from.path === "/") {
    return navigateTo("/employees");
  }
});
