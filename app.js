const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const telas=$$('.tela');
let perfil='a';
const nomes={a:'Aluno',p:'Professor',x:'Administrador'};

function menu(){
  const nav=$('nav');
  nav.innerHTML=`<small>Perfil: ${nomes[perfil]}</small>`+
    telas.filter(t=>t.dataset.roles.includes(perfil)&&t.id!=='login')
      .map(t=>`<a href="#${t.id}">${t.dataset.titulo}</a>`).join('');
}
function ir(){
  const id=location.hash.slice(1)||'login';
  const t=$('#'+id)||$('#login');
  if(t.id!=='login'&&!t.dataset.roles.includes(perfil)){location.hash=primeira();return}
  telas.forEach(x=>x.classList.toggle('on',x===t));
  $$('nav a').forEach(a=>a.classList.toggle('on',a.hash==='#'+t.id));
  $('nav').style.display=t.id==='login'?'none':'';
}
const primeira=()=>telas.find(t=>t.dataset.roles.includes(perfil)&&t.id!=='login').id;

$('#perfil').onchange=e=>{perfil=e.target.value;menu();location.hash=primeira()};
$('#sair').onclick=()=>{location.hash='login'};
window.onhashchange=ir;

// login / recuperação
$$('.tabs button').forEach(b=>b.onclick=()=>{
  $$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));
  $('#f-login').hidden=b.dataset.t!=='login';
  $('#f-rec').hidden=b.dataset.t!=='rec';
});
$('#entrar').onclick=()=>{perfil=$('#perfil').value;menu();location.hash=primeira()};
$('#enviar-rec').onclick=()=>alert('Link de redefinição enviado ao e-mail cadastrado (simulação).');

// aula concluída
$('#concluir').onclick=e=>{
  $('#st-aula').textContent='Concluída ✔';$('#st-aula').className='ok';
  e.target.disabled=true;
};
// botões de simulação genérica
$$('[data-msg]').forEach(b=>b.onclick=()=>alert(b.dataset.msg));
// alternar status em tabelas
$$('.tg').forEach(b=>b.onclick=()=>{
  const c=b.closest('tr').querySelector('.st');
  c.textContent=c.textContent==='Ativo'?'Inativo':'Ativo';
});
// notas: simulação de filtro de relatório
$('#gerar').onclick=()=>{$('#rel-out').hidden=false};
$('#buscar-log').onclick=()=>alert('Filtro aplicado (simulação).');

menu();ir();
