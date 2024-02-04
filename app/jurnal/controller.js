const { account, note, journal, coa } = require('../../db/models');

module.exports = {
  viewJurnal: async (req, res) => {
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

      res.render('admin/jurnal/view_jurnal', {
        route: 'Jurnal',
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
  viewDetailJurnalYayasan: async (req, res) => {
    try {
      const { fullname } = req.params;

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const fullnameDecode = decodeURIComponent(fullname.replace(/-/g, ' '));

      const yayasan = await account.findOne({
        where: { fullname: fullnameDecode },
      });

      const catatan = await note.findAll({
        where: {
          id_account: yayasan.id,
        },
        order: [['date', 'DESC']],
      });

      // console.log('data yayasan => ', yayasan);
      // console.log('data catatan => ', catatan);

      res.render('admin/jurnal/yayasan/view_jurnal_yayasan', {
        route: 'Jurnal',
        yayasan,
        catatan,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/jurnal');
    }
  },
  viewAddJurnalYayasan: async (req, res) => {
    try {
      const { fullname } = req.params;

      const fullnameDecode = decodeURIComponent(fullname.replace(/-/g, ' '));

      const yayasan = await account.findOne({
        where: { fullname: fullnameDecode },
      });

      const code = await coa.findAll();

      res.render('admin/jurnal/yayasan/add_jurnal', {
        route: 'Jurnal',
        yayasan,
        code,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/jurnal');
    }
  },
  actionAddJurnalYayasan: async (req, res) => {
    try {
    } catch (error) {}
  },
};
