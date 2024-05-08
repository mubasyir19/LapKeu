const { account, note, coa, journal } = require('../../db/models');
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
  viewDetailBukuBesarYayasan: async (req, res) => {
    try {
      const { fullname } = req.params;

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const fullnameDecode = decodeURIComponent(fullname.replace(/-/g, ' '));

      const yayasan = await account.findOne({
        where: { fullname: fullnameDecode },
      });

      const jurnal = await journal.findAll({
        where: {
          id_account: yayasan.id,
        },
        include: [
          {
            model: coa,
            attributes: ['id', 'code', 'name', 'position'],
          },
          {
            model: account,
            attributes: ['id', 'saldo', 'fullname'],
            where: {
              id: yayasan.id, // Filter untuk mendapatkan account yayasan
            },
          },
        ],
        order: [['date', 'ASC']],
      });

      for (let i = 0; i < jurnal.length; i++) {
        console.log('Nama Yayasan:', jurnal[i].account.fullname);
        console.log('Saldo Yayasan:', jurnal[i].account.saldo);
      }

      res.render('admin/buku-besar/yayasan/view_buku_besar_yayasan', {
        route: 'Buku Besar',
        yayasan,
        alert,
        jurnal,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/buku-besar');
    }
  },
};
