const { note, account } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  viewListCatatan: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const listAllCatatan = await note.findAll({
        include: {
          model: account,
          attributes: ['fullname', 'username'],
        },
      });

      res.render('admin/list-catatan/view_list-catatan', {
        route: 'List Catatan',
        listAllCatatan,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/list-catatan');
    }
  },
  viewCatatan: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      let user = req.session.account.id;
      const listCatatan = await note.findAll({
        where: {
          id_account: user,
        },
        order: [['date', 'DESC']],
      });

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
      const { description, amount, date, type, bank } = req.body;

      await note.create({
        id: noteId,
        id_account: user,
        description,
        amount,
        type,
        bank,
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
  viewEditCatatan: async (req, res) => {
    try {
      const { id } = req.params;
      let user = req.session.account.id;

      const catatan = await note.findOne({
        where: {
          id,
          id_account: user,
        },
        order: [['date', 'DESC']],
      });

      res.render('admin/catatan/edit_catatan', {
        route: 'Catatan',
        catatan,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/catatan');
    }
  },
  actionEditCatatan: async (req, res) => {
    try {
      let user = req.session.account.id;
      const { id } = req.params;
      const { description, amount, date } = req.body;

      const catatan = await note.findOne({
        where: {
          id,
          id_account: user,
        },
        order: [['date', 'DESC']],
      });

      await catatan.update({
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
