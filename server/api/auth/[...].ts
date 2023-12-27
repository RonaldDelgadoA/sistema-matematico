import { NuxtAuthHandler } from '#auth'
import AzureADProvider from "next-auth/providers/azure-ad";
import { createUser, findUserByEmail } from '../../services/user.service';
import { Session } from 'next-auth';

const runtimeConfig = useRuntimeConfig()

export interface SessionType extends Session{
  _id?: string | undefined,
  role?: string | undefined
}
export default NuxtAuthHandler({
  secret: runtimeConfig.SECRET,
  providers: [
    (AzureADProvider as any).default({
      clientId: runtimeConfig.AZURE_CLIENTID,
      clientSecret: runtimeConfig.AZURE_CLIENTSECRET,
      tenantId: runtimeConfig.AZURE_TENANTID,
    }),
  ],
  callbacks:{
    async session({session}) {
      if(session){
        let currentUser = await findUserByEmail(session?.user?.email)
        session = Object.assign(session,{_id: currentUser!._id, role: currentUser!.role})
      }
      return session as SessionType 
    },
    
    async signIn({user}) {
      await createUser({name: user?.name, email: user?.email})
      return true      
    }
  }
})