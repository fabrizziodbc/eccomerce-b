const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const UserService = require('./usersService');
const service = new UserService();

class AuthService {
  constructor() {}
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: '15min',
    });
    const link = `https://soytufrontendxd.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: '"Una tienda bien chida👻" <ps.fabc.011772@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Recupera tu contraseña', // Subject line
      /* text: 'Booo?', // plain text body */
      html: `<b>Ingresa al siguiente enlace para recuperar tu contraseña 👉 ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.nodeMailerUser,
        pass: config.nodeMailerPassword,
      },
    });
    // send mail with defined transport object
    await transporter.sendMail(infoMail);

    return { message: 'Mail sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
