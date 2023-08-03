/** @type {import("astro").MiddlewareResponseHandler} */
export async function onRequest({ locals, request }, next) {
  const res = await next();
  return res;
}
