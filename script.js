
(function(){
  const header=document.querySelector('.mt-header');
  const burger=document.querySelector('.mt-burger');
  if(burger) burger.addEventListener('click',()=>header.classList.toggle('menu-open'));
  document.querySelectorAll('.mt-nav a').forEach(a=>a.addEventListener('click',()=>header&&header.classList.remove('menu-open')));
  const modal=document.getElementById('mtLeadModal');
  if(!modal) return;
  const form=document.getElementById('mtLeadForm');
  const service=document.getElementById('mtService');
  const title=document.getElementById('mtModalTitle');
  const success=document.getElementById('mtSuccess');
  const ENDPOINT=''; // В Tilda можно заменить на webhook CRM / n8n / Make.
  const open=(label,channel)=>{
    service.value=label||'Консультация';
    title.textContent=label||'Оставьте контакты';
    const c=form.querySelector('[name="contact"]'); if(channel) c.placeholder=channel;
    success.style.display='none';form.style.display='grid';modal.classList.add('is-open');
    setTimeout(()=>form.querySelector('[name="name"]').focus(),50);
  };
  const close=()=>modal.classList.remove('is-open');
  document.querySelectorAll('.js-open-lead').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();open(el.dataset.service,el.dataset.placeholder)}));
  modal.querySelector('.mt-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    if(!ENDPOINT){success.textContent='Спасибо! Форма работает. Для реальной отправки подключите Tilda Forms / webhook по инструкции в пакете.';success.style.display='block';form.style.display='none';console.log('Mozhenkov Travel lead',data);return;}
    try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();success.textContent='Спасибо! Заявка отправлена.';success.style.display='block';form.style.display='none';form.reset()}catch(err){alert('Не удалось отправить заявку. Свяжитесь с Mozhenkov Travel через Telegram или WhatsApp.')}});
})();
