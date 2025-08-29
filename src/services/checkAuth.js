export function checkAuth(ctx) {
  const cookies = ctx.req.headers.cookie || "";
  const tokenCookie = cookies
    .split("; ")
    .find((c) => c.startsWith("auth_token="));

  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}