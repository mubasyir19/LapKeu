module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      res.render('index', {
        route: 'Dashboard',
        alert,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
