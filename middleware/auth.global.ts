import { Session } from "next-auth";

export interface SessionType extends Session{
  _id?: string | undefined,
  role?: string | undefined
}

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  const data = auth.data.value as SessionType
  if(!to.fullPath.startsWith('/api')){

    if(to.fullPath === '/' && data)
      return navigateTo(data.role)
    
    if(to.fullPath !== '/' && !data)
      return navigateTo('/')
  
    if(data){
      if(!to.fullPath.startsWith(`/${data.role}`))
        return navigateTo(`/${data.role}`)
    }
  }
})
