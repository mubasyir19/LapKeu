const { coa } = require('../../db/models');
const uuid = require('uuid');

module.exports = {
  viewCoa: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const listCoa = await coa.findAll({
        order: [['code', 'ASC']],
      });

      res.render('admin/coa/view_coa', {
        route: 'Coa',
        listCoa,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/dashboard');
    }
  },
  viewAddCoa: async (req, res) => {
    try {
      res.render('admin/coa/add_coa', {
        route: 'Coa',
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/coa');
    }
  },
  actionAddCoa: async (req, res) => {
    try {
      const coaId = uuid.v4();
      const { code, name, position } = req.body;

      await coa.create({
        id: coaId,
        code,
        name,
        position,
      });

      req.flash('alertMessage', 'Berhasil tambah Chart of Account');
      req.flash('alertStatus', 'success');

      res.redirect('/coa');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/coa');
    }
  },
  viewEditCoa: async (req, res) => {
    try {
      const { id } = req.params;

      const dataCoa = await coa.findOne({
        where: {
          id: id,
        },
      });

      res.render('admin/coa/edit_coa', {
        route: 'Coa',
        dataCoa,
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/coa');
    }
  },
  actionEditCoa: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, name, position } = req.body;

      const coa = await coa.findOne({
        where: {
          id: id,
        },
      });

      await coa.update({
        code,
        name,
        position,
      });

      req.flash('alertMessage', 'Coa berhasil diubah');
      req.flash('alertStatus', 'success');

      res.redirect('/coa');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/coa');
    }
  },
};
