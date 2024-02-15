import {  ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { agent } from "supertest";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// /src/prisma/prisma.service
@Injectable()
export class AuthService{
  constructor(private prisma :PrismaService , private config:ConfigService,private jwt:JwtService) {}

  async signup(dto:AuthDto){
     // Convert email to string
     const email = dto.email.toString();
      // generate the password  hash
    const hash=await argon.hash(dto.password.toString())
      // save the new user in the db 
      try{

        const user =await this.prisma.user.create({
          data:{
             email: email,
            hash
            
          }
        })
        delete user.hash
        // return the saved user 
        return user
      
      }catch(error){
        if( error instanceof PrismaClientKnownRequestError){
          if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken ',
        )
  }}
  throw error;
}

  
async signin(dto: AuthDto) {
  
  const email = dto.email.toString()
  // find the user by email
  const user = await this.prisma.user.findUnique({
    where: {
      email:email
    }})
    


  // if user is not exist throw exception
  if (!user) {
      throw new ForbiddenException("the user does not exist")
  }

  // compare the password
  const pwMatches= await  argon.verify(user.hash.toString(),dto.password.toString(),)
  // if password incorrect throw exception
if(!pwMatches)
throw new ForbiddenException(" incorrect password")
  // send back the user

  return this.signToken(user.id,user.email)

}
async signToken(
    userId:number,
    email:string
    ):Promise< {access_token: String}>{
      const payload={
        sub:userId,
        email
      }
      const secret=this.config.get('JWT_SECRET')
      const token= await this.jwt.signAsync(payload,{
      expiresIn:'15m',
      secret:secret
    });
    return {
      access_token: token,
    }
    }
  }

