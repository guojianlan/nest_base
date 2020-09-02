import { Controller, Get, Param, Query, DefaultValuePipe, ParseIntPipe, Post, Body } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from 'entities';
import { PAGE_SIZE } from 'constants/index';
import { Pagination } from 'type/custom';
import { loginAndRegisterByMobileDto } from 'dto/user';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe) pageSize: number): Promise<Pagination<User>> {
        return this.userService.findAll({
            page,
            pageSize
        })
    }
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id)
    }
    @Get('/name/:name')
    getUserByName(@Param('name') name: string) {
        return this.userService.getUserByName(name)
    }
    /**
     *
     *
     * @param {U_M_LoginDto} body
     * @memberof UserController
     */
    @Post('/m/login')
    loginAndRegisterByMobile(@Body() body: loginAndRegisterByMobileDto) {
        return body
    }
    /**
     * 手机加密码登录
     */
    @Post('/m/loginByMobile')
    loginByMobile() {

    }

}
