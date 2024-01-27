const { account } = require('../../db/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = {
  viewLogin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('login/view_login', {
        route: 'Login',
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
    }
  },
  actionLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const checkAccount = await account.findOne({
        where: {
          username: username,
        },
      });

      if (checkAccount) {
        const checkPass = await bcrypt.compare(password, checkUser.password);

        if (checkPass) {
          req.session.account = {
            id: checkUser.id,
            fullname: checkUser.name,
            username: checkUser.username,
            role: checkUser.role,
          };

          // Response Success Login
          res.redirect('/dashboard');
        } else {
          req.flash('alertMessage', `Password Anda Salah`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `Username Anda belum terdaftar`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (error) {
      // Resopnse Error
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  viewRegistrasi: async (req, res) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');

    const alert = { message: alertMessage, status: alertStatus };

    try {
      res.render('registrasi/view_registrasi', {
        route: 'Registrasi',
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionRegistrasi: async (req, res) => {
    try {
      const { fullname, username, password, confirmPassword } = req.body;
      const accountId = uuid.v4();

      const checkAccount = await account.findOne({ where: { fullname: fullname } });
      if (checkAccount) {
        req.flash('alertMessage', `Anda sudah pernah mendaftar`);
        req.flash('alertStatus', 'danger');
        res.redirect('/registrasi');
      }

      if (password !== confirmPassword) {
        req.flash('alertMessage', `Password dan confirm password tidak cocok`);
        req.flash('alertStatus', 'danger');
        res.redirect('/registrasi');
      }

      await account.create({
        id: accountId,
        fullname,
        username,
        password: bcrypt.hashSync(password, 10),
        role: 'Yayasan',
      });

      req.flash('alertMessage', 'Berhasil registrasi akun');
      req.flash('alertStatus', 'success');

      res.redirect('/');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/registrasi');
    }
  },
  viewListAccount: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('admin/list-account/view_list-account', {
        route: 'List Account',
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
    }
  },
};
