module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      // console.log(req.session.account.id);
      res.render('index', {
        route: 'Dashboard',
        alert,
        // account: req.session.account,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
