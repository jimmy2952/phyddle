import { SignUpRequest } from "@/types/signup"

const fetchApi = (url: string, { method = "GET", headers = {}, data }: { method: string, headers?: object, data: any }) => fetch(url, {
  method,
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    ...headers
  },
  body: JSON.stringify(data),
})

export const signup = (data: SignUpRequest) => fetchApi("/api/signup", {
  method: "POST",
  data,
})