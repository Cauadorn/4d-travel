/* 4D Travel — página de obrigado */
import { whatsappUrl } from './config.js';

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) { a.href = whatsappUrl(); });

var d = new Date();
var el = document.querySelector('[data-date]');
if (el) el.textContent = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');

var y = document.querySelector('[data-year]');
if (y) y.textContent = d.getFullYear();
