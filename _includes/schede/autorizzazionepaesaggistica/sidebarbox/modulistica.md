{% capture autpaesoptions %}
<option value="/docs/modulistica/ModelloOrdinaria.pdf">Istanza di autorizzazione paesaggistica con procedimento ordinario</option>
<option value="/docs/modulistica/ModelloSemplificata.pdf">Istanza di autorizzazione paesaggistica con procedimento semplificato</option>
<option value="/docs/modulistica/SchedaSemplificata.pdf">Scheda semplificata di cui all'allegato D del D.P.R. 31/2017</option>
<option value="/docs/modulistica/ModelloRichiestaAccertamento.pdf">Istanza di accertamento di compatibilità paesaggistica</option>
{% endcapture %}

{% include modulistica_select_include.html options=autpaesoptions %}
