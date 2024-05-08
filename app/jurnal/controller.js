const { account, note, journal, coa } = require('../../db/models');
const uuid = require('uuid');

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
      const reservation = req.query.reservation;

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

      const jurnal = await journal.findAll({
        where: {
          id_account: yayasan.id,
        },
        include: {
          model: coa,
          attributes: ['id', 'code', 'name', 'position'],
        },
        order: [['date', 'ASC']],
      });

      // console.log('data jurnal => ', jurnal);
      // console.log('data catatan => ', catatan);

      res.render('admin/jurnal/yayasan/view_jurnal_yayasan', {
        route: 'Jurnal',
        yayasan,
        catatan,
        jurnal,
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
      const notes = await note.findAll({
        where: {
          id_account: yayasan.id,
        },
      });

      // console.log('ini saldo yayasan => ', yayasan.saldo);
      // notes.forEach((nt) => {
      //   console.log('Ini jumlah uang dari catatan =>', nt.amount);
      // });

      res.render('admin/jurnal/yayasan/add_jurnal', {
        route: 'Jurnal',
        yayasan,
        notes,
        code,
        fullname,
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
      const { fullname } = req.params;
      const { date, description, id_coa, debit, kredit } = req.body;
      const journalId = uuid.v4();

      const fullnameDecode = decodeURIComponent(fullname.replace(/-/g, ' '));

      const yayasan = await account.findOne({
        where: { fullname: fullnameDecode },
      });

      const response = await journal.create({
        id: journalId,
        id_account: yayasan.id,
        date,
        description,
        id_coa,
        debit,
        kredit,
      });

      console.log('Response add journal => ', response);

      const saldoInt = parseInt(yayasan.saldo, 10); // Mengubah saldo menjadi integer
      const debitInt = parseInt(debit, 10); // Mengubah debit menjadi integer
      const kreditInt = parseInt(kredit, 10); // Mengubah kredit menjadi integer
      const updateSaldo = saldoInt + debitInt - kreditInt; // Menggunakan nilai integer untuk perhitungan
      const updateSaldoYayasan = await yayasan.update({ saldo: updateSaldo });

      console.log('Update saldo yayasan => ', updateSaldoYayasan);

      req.flash('alertMessage', `Berhasil tambah jurnal ${yayasan.fullname}`);
      req.flash('alertStatus', 'success');

      res.redirect(`/jurnal/${fullname}`);
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', `Terjadi Masalah`);
      req.flash('alertStatus', 'danger');
      res.redirect('/jurnal');
    }
  },
};
