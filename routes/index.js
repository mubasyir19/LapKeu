const express = require('express');
const router = express.Router();
const account = require('../app/account/controller');
const dashboard = require('../app/dashboard/controller');
const coa = require('../app/coa/controller');
const catatan = require('../app/catatan/controller');
const jurnal = require('../app/jurnal/controller');

// authentication
router.get('/', account.viewLogin);
router.post('/', account.actionLogin);
router.get('/registrasi', account.viewRegistrasi);
router.post('/registrasi', account.actionRegistrasi);
router.post('/registrasi', account.actionRegistrasi);
router.get('/logout', account.actionLogout);

// Dashboard
router.get('/dashboard', dashboard.viewDashboard);

// Account
router.get('/list-account', account.viewListAccount);

// CoA
router.get('/coa', coa.viewCoa);
router.get('/coa/tambah', coa.viewAddCoa);
router.post('/coa/tambah', coa.actionAddCoa);

// Catatan
router.get('/list-catatan', catatan.viewListCatatan);
router.get('/catatan', catatan.viewCatatan);
router.get('/catatan/tambah', catatan.viewAddCatatan);
router.post('/catatan/tambah', catatan.actionAddCatatan);

// Jurnal
router.get('/jurnal', jurnal.viewJurnal);

module.exports = router;
