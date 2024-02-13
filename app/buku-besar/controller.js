const { account, note, coa } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  viewBukuBesar: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const yayasan = await account.findAll({
        where: {
          role: 'Yayasan',
        },
        attributes: ['id', 'fullname'],
      });

      res.render('admin/buku-besar/view_buku_besar', {
        route: 'Buku Besar',
        yayasan,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
    }
  },
  viewDetailBukuBesarYayasan: async (req, res) => {},
};
