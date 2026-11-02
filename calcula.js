/* Calculadora: no porta cap xifra nostra. Només fa el compte amb els números que hi posa qui la fa servir. */
(function () {
  'use strict';
  var fmt = function (n) { return n.toLocaleString('ca-ES', { maximumFractionDigits: 1 }); };
  var num = function (el) { var v = parseFloat(String(el.value).replace(',', '.')); return isFinite(v) && v >= 0 ? v : null; };
  document.querySelectorAll('.calc').forEach(function (calc) {
    var q = function (n) { return calc.querySelector('[name="' + n + '"]'); };
    var out = calc.querySelector('.resultat');
    var unitat = calc.dataset.unitat || 'minuts';
    function compta() {
      var quants = num(q('quants')), avui = num(q('avui')), revisio = q('revisio') ? num(q('revisio')) : null, preu = q('preu') ? num(q('preu')) : null;
      if (quants === null || avui === null) { out.innerHTML = '<span class="buit">Poseu-hi els vostres números i aquí sortirà el compte.</span>'; return; }
      var factor = unitat === 'hores' ? 1 : 1 / 60;
      var hMes = quants * avui * factor;
      var html = 'Segons les vostres dades, avui hi dediqueu<span class="gran">' + fmt(hMes) + ' h al mes · ' + fmt(hMes * 11) + ' h l’any</span>';
      if (revisio !== null && revisio < avui) {
        var lliures = quants * (avui - revisio) * factor;
        html += 'Si només ho haguéssiu de revisar, quedarien lliures unes <b>' + fmt(lliures) + ' h al mes</b> (' + fmt(lliures * 11) + ' h l’any).';
        if (preu !== null) html += ' Al vostre cost per hora, són ' + Math.round(lliures * 11 * preu).toLocaleString('ca-ES') + ' € l’any.';
      }
      html += '<br><small class="nota">Comptem 11 mesos de feina l’any. Abans de cap compromís ho comprovem amb un document vostre.</small>';
      out.innerHTML = html;
    }
    calc.addEventListener('input', compta);
    compta();
  });
})();
