const redirect = (dest: string): Response => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
    },
  })
}

export default redirect
