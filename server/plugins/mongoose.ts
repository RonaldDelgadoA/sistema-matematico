import {connect} from "mongoose";

export default defineNitroPlugin(async(nitroApp)=>{
  const runtimeConfig = useRuntimeConfig()
  
  await connect(runtimeConfig.public.MONGO_URI)
  console.log('MONGO DB conectado!');
})