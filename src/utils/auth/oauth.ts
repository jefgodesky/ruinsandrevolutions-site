import { GitHub, Google, Discord } from 'arctic'

export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID as string,
  import.meta.env.GITHUB_CLIENT_SECRET as string,
  `${import.meta.env.DOMAIN}/catalogue/login/github/callback`
)

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID as string,
  import.meta.env.GOOGLE_CLIENT_SECRET as string,
  `${import.meta.env.DOMAIN}/catalogue/login/google/callback`
)

export const discord = new Discord(
  import.meta.env.DISCORD_CLIENT_ID as string,
  import.meta.env.DISCORD_CLIENT_SECRET as string,
  `${import.meta.env.DOMAIN}/catalogue/login/discord/callback`
)
