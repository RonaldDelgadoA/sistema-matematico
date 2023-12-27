import { UserModel } from "../models/user.model"

export const findUserByEmail = async(email?:string | null)=>{
  const user = await UserModel.findOne({email: email})
  // if(!user){
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'El email no existe',
  //   })
  // }
  return user
}

export const getStudentById = async(id:string)=>{
  const student = await UserModel.findById(id)  
  if (!student || student.role !== 'student') throw createError({statusMessage:'El id no es de un estudiante'})
}

export const createUser = async({name,email}:IUserServer)=>{
  if(!name || !email) throw new Error('Debe envíar el name y email')
  const user = await UserModel.findOne({email: email})
  if(user) return null
  let role = /@uleam\.edu\.ec$/i.test(email) || /@outlook\.com$/i.test(email) || email === 'p1308085826@dn.uleam.edu.ec' ? 'teacher':'student'
  return await UserModel.create({name,email,role})
}

interface IUserServer{
  name?: string | null
  email?: string | null
}