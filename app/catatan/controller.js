const { note } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  viewCatatan: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const listCatatan = await note.findAll();

      res.render('admin/catatan/view_catatan', {
        route: 'Catatan',
        listCatatan,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/catatan');
    }
  },
  viewAddCatatan: async (req, res) => {
    try {
      res.render('admin/catatan/add_catatan', {
        route: 'Catatan',
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/catatan');
    }
  },
  actionAddCatatan: async (req, res) => {
    try {
      let user = req.session.account.id;
      const noteId = uuid.v4();
      const { description, amount, date } = req.body;

      await note.create({
        id: noteId,
        id_account: user,
        description,
        amount,
        date,
      });

      req.flash('alertMessage', 'Berhasil tambah catatan');
      req.flash('alertStatus', 'success');

      res.redirect('/catatan');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/catatan');
    }
  },
};
