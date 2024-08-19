export const dev_env = {
  BASE_URL_API: import.meta.env.VITE_API_DEV,
}

export const prod_env = {
  BASE_URL_API: import.meta.env.VITE_API_PROD,
}

export const connection = prod_env.BASE_URL_API
