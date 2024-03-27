import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10)
      })

      await this.userRepository.save(user)
      delete user.password

      return user
      
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      console.log(error)
      this.handleDBError(error)
    }
  }

  async login(loginUserDto: LoginUserDto){
    let { password, email} = loginUserDto

    email = email.toLowerCase()

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    })

    if( !user )
      throw new UnauthorizedException('Not valid credentials (email)')

    if( !bcrypt.compareSync( password, user.password))
      throw new UnauthorizedException('Not valid credentials (password)')

    return {id: user.id, email: user.email, fullName: user.fullName}
  }

  async findOne(id: number) {
    const user:User = await this.userRepository.findOneBy({id})
    return {id: user.id, email: user.email, fullName: user.fullName}
  }

  private handleDBError( error: any): never{
    if ( error.code === '23505')
      throw new BadRequestException(error.detail)

    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }
}
