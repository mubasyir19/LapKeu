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
    } catch (error) {}
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
    } catch (error) {}
  },
};
