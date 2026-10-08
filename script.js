var $=function(i){return document.getElementById(i)};
var KELAS=[];for(var n=1;n<=6;n++)['A','B'].forEach(function(l){KELAS.push('Kelas '+n+l)});
function norm(a){a.forEach(function(p){if(KELAS.indexOf(p.c)<0)p.c='';if(p.n=='Uang pangkal'&&!p.h)p.h=14000000;if(p.n=='Spp bulan juli'&&!p.h)p.h=500000});return a}
var P0=[
 {n:"Pendaftaran siswa baru SD HAS DARUL ILMI tahun pelajaran 2026-2027",c:'',h:700000,s:0,i:'📜'},
 {n:"Uang pangkal",c:'',h:14000000,s:0,i:'🏫'},
 {n:"Uang buku",c:'',h:0,s:0,i:'📚'},
 {n:"Spp bulan juli",c:'',h:500000,s:0,i:'💳'},
 {n:"Uang kegiatan",c:'',h:0,s:0,i:'🎉'},
 {n:"Uang seragam 3 stel",c:'',h:0,s:0,i:'👕'},
 {n:"Uang seragam batik",c:'',h:0,s:0,i:'👕'},
 {n:"Uang seragam hijau kotak",c:'',h:0,s:0,i:'👕'},
 {n:"Uang seragam olahraga",c:'',h:0,s:0,i:'👟'},
 {n:"Uang spp",c:'',h:0,s:0,i:'💳'},
 {n:"Uang eskul tari",c:'',h:0,s:0,i:'💃'},
 {n:"Uang eskul silat",c:'',h:0,s:0,i:'🥋'},
 {n:"Uang eskul karate",c:'',h:0,s:0,i:'🥋'},
 {n:"Uang eskul futsal",c:'',h:0,s:0,i:'⚽'},
 {n:"Uang eskul bulutangkis",c:'',h:0,s:0,i:'🏸'},
 {n:"Uang eskul tahfidz",c:'',h:0,s:0,i:'📖'},
 {n:"Uang eskul renang",c:'',h:0,s:0,i:'🏊'},
 {n:"Uang eskul animasi coding",c:'',h:0,s:0,i:'💻'},
 {n:"Uang eskul desain grafis",c:'',h:0,s:0,i:'🎨'},
 {n:"Uang eskul inggris club",c:'',h:0,s:0,i:'🗣️'},
 {n:"Uang eskul robotik",c:'',h:0,s:0,i:'🤖'},
 {n:"Uang eskul komik",c:'',h:0,s:0,i:'🖍️'}
];
var P=norm(load()||P0),q=P.map(function(){return 0}),cat='Semua';
var GT=0,MET='Tunai';
function qb(v){$('bayar').value=v||GT;render()}
function setMet(m){
 MET=m;var nt=m!='Tunai';
 document.querySelectorAll('.mm').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-m')==m)});
 $('bayar').disabled=nt;if(nt)$('bayar').value=GT||'';
 render();
}
function openPay(){$('pe').textContent='';setMet(MET);$('pmod').classList.add('on');if(MET=='Tunai')$('bayar').focus()}
function closePay(){$('pmod').classList.remove('on')}
function finishPay(){
 render();var by=parseInt($('bayar').value,10)||0;
 if(!GT){$('pe').textContent='Keranjang masih kosong.';return}
 if(by<GT){$('pe').textContent='Uang diterima kurang Rp '+fmt(GT-by)+'.';return}
 closePay();showReceipt(true);
}
function add(i,d){var v=q[i]+d;if(v<0)return;q[i]=v;draw();render()}
function clearCart(){q=P.map(function(){return 0});draw();render()}
function draw(){
 if(cat!='Semua'&&cats().indexOf(cat)<0)cat='Semua';
 var k=($('cari').value||'').toLowerCase();
 setChips();
 $('cards').innerHTML=P.map(function(p,i){
  if((cat!='Semua'&&p.c!=cat)||p.n.toLowerCase().indexOf(k)<0)return '';
  return '<button class="card" onclick="add('+i+',1)"><div class="ic">'+p.i+'</div><div class="nm">'+p.n+'</div><div class="ft"><span class="pr">Rp '+fmt(p.h)+'</span></div></button>'}).join('');
 var h='';P.forEach(function(p,i){if(q[i])h+='<div class="ci"><div><b>'+p.n+'</b><small>Rp '+fmt(p.h)+'</small></div><div class="qc"><button onclick="add('+i+',-1)" aria-label="Kurangi">-</button><span>'+q[i]+'</span><button onclick="add('+i+',1)" aria-label="Tambah">+</button><button onclick="add('+i+',-'+q[i]+')" aria-label="Hapus">🗑</button></div></div>'});
 $('items').innerHTML=h||'<p class="empty">Keranjang kosong. Klik produk untuk menambahkan.</p>';
}
var ed=-1,armed=-1;
function save(){try{localStorage.setItem('hdi_p2',JSON.stringify(P))}catch(e){}}
function load(){try{var v=JSON.parse(localStorage.getItem('hdi_p2'));if(v&&v.length){v.forEach(function(p){if(p.i=='🍽️'||p.i=='🍽')p.i='📜'});return v}}catch(e){}return null}
function cats(){return KELAS.slice()}
function go(v){document.body.classList.toggle('v-prod',v=='prod');$('n1').classList.toggle('on',v!='prod');$('n2').classList.toggle('on',v=='prod');$('ttl').textContent=v=='prod'?'Manajemen Produk':'Halaman Kasir';if(v=='prod')drawProd()}
function setChips(){
 var h=['Semua'].concat(cats()).map(function(c){return '<button class="chip'+(c==cat?' on':'')+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join('');
 $('chips').innerHTML=h;$('pchips').innerHTML=h;
}
function drawProd(){
 if(cat!='Semua'&&cats().indexOf(cat)<0)cat='Semua';
 setChips();
 $('ptb').innerHTML=P.map(function(p,i){if(cat!='Semua'&&p.c!=cat)return '';return '<tr><td><div class="pn"><span class="ic">'+p.i+'</span>'+esc(p.n)+'</div></td><td>Rp '+fmt(p.h)+'</td><td><button class="al" onclick="openMod('+i+')">Edit</button><button class="al d" onclick="del('+i+')">Hapus</button></td></tr>'}).join('')||'<tr><td colspan="3">Belum ada produk. Klik Tambah Produk Baru.</td></tr>';
}
var di=-1;
function del(i){di=i;$('dn').textContent=P[i].n;$('dmod').classList.add('on')}
function closeDel(){$('dmod').classList.remove('on');di=-1}
function confirmDel(){
 if(di<0)return;
 P.splice(di,1);q.splice(di,1);save();closeDel();drawProd();draw();render();
}
function openMod(i){
 ed=i;var p=i<0?{n:'',c:'',h:'',s:'',i:'📜'}:P[i];
 $('mt').textContent=i<0?'Tambah Produk Baru':'Edit Produk';
 $('mn').value=p.n;$('mc').value=p.c;$('mh').value=p.h;$('mi').value=p.i;$('me').textContent='';
 $('mod').classList.add('on');$('mn').focus();
}
function closeMod(){$('mod').classList.remove('on')}
function saveMod(){
 var n=$('mn').value.trim(),c=$('mc').value.trim(),h=parseInt($('mh').value,10);
 if(!n||isNaN(h)||h<0){$('me').textContent='Nama dan harga wajib diisi dengan benar.';return}
 var o={n:n,c:c,h:h,s:0,i:$('mi').value.trim()||'📜'};
 if(ed<0){P.push(o);q.push(0)}else{P[ed]=o}
 save();closeMod();drawProd();draw();render();
}
function tick(){$('clock').textContent=new Date().toLocaleString('id-ID',{weekday:'long',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})+' WIB'}
var satuan=['','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh','sebelas'];
function tb(n){
 if(n<12)return satuan[n];
 if(n<20)return tb(n-10)+' belas';
 if(n<100)return tb(Math.floor(n/10))+' puluh'+(n%10?' '+tb(n%10):'');
 if(n<200)return 'seratus'+(n%100?' '+tb(n%100):'');
 if(n<1000)return tb(Math.floor(n/100))+' ratus'+(n%100?' '+tb(n%100):'');
 if(n<2000)return 'seribu'+(n%1000?' '+tb(n%1000):'');
 if(n<1e6)return tb(Math.floor(n/1000))+' ribu'+(n%1000?' '+tb(n%1000):'');
 if(n<1e9)return tb(Math.floor(n/1e6))+' juta'+(n%1e6?' '+tb(n%1e6):'');
 if(n<1e12)return tb(Math.floor(n/1e9))+' miliar'+(n%1e9?' '+tb(n%1e9):'');
 return tb(Math.floor(n/1e12))+' triliun'+(n%1e12?' '+tb(n%1e12):'');
}
function cap(s){return s.replace(/\b\w/g,function(c){return c.toUpperCase()})}
function fmt(n){return n.toLocaleString('id-ID')}
function render(){
 $('pDari').textContent=$('dari').value;
 $('pKota').textContent=$('kota').value?$('kota').value+',':'';
 var d=$('tgl').value;
 $('pTgl').textContent=d?d.split('-').reverse().join('/'):'';
 $('pTtd').textContent=$('ttd').value;
 $('pCat').textContent=$('cat').value;
 var sub=0,h='',n=0,rc=0;
 function row(no,nm,amt){rc++;return '<tr><td class="n">'+no+'</td><td>'+(nm||'&nbsp;')+'</td><td class="j">'+(amt!==''?'<div class="m"><span>Rp.</span><span>'+amt+'</span></div>':'')+'</td></tr>'}
 P.forEach(function(p,i){if(!q[i])return;n++;var a=p.h*q[i];sub+=a;h+=row(n,p.n+(q[i]>1?' x '+q[i]:''),fmt(a))});
 var dv=Math.min(parseInt($('disc').value,10)||0,sub);
 var t=sub-dv;
 if(dv)h+=row('','Diskon','-'+fmt(dv));
 while(rc<6)h+=row('','','');
 $('pRows').innerHTML=h;
 $('pTot').textContent=t?fmt(t):'-';
 $('pTerb').textContent=t?cap(tb(t))+' Rupiah':'Nol Rupiah';
 $('sub').textContent='Rp '+fmt(sub);
 $('dv').textContent='- Rp '+fmt(dv);
 $('gt').textContent='Rp '+fmt(t);
 GT=t;if(MET!='Tunai')$('bayar').value=t||'';
 $('gt2').textContent='Rp '+fmt(t);$('q1').textContent='Rp '+fmt(t);
 var by=parseInt($('bayar').value,10)||0,kr=by&&by<t;
 $('kbl').textContent=kr?'Kurang:':'Kembalian:';
 $('kb').textContent='Rp '+fmt(kr?t-by:Math.max(by-t,0));
 $('kb').className=kr?'neg':'';
 $('pPay').style.display=by?'flex':'none';
 $('pMet').textContent=MET;$('pBy').textContent=fmt(by);
 $('pKbl').textContent=kr?'Kurang :':'Kembalian :';$('pKb').textContent=fmt(kr?t-by:Math.max(by-t,0));
}
function showReceipt(on){
 var o=$('out');o.classList.toggle('off',!on);
 if(on){render();o.scrollIntoView({behavior:'smooth',block:'start'})}
}
function printNow(){
 render();
 try{window.print()}catch(e){}
}
function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var today=new Date();
$('tgl').value=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
document.addEventListener('input',function(e){if(e.target.id=='cari')draw();render()});
document.addEventListener('change',render);
document.addEventListener('click',function(e){var c=e.target.getAttribute&&e.target.getAttribute('data-c');if(c){cat=c;draw();drawProd()}});
tick();setInterval(tick,30000);
$('mc').innerHTML='<option value="">Tanpa kelas</option>'+KELAS.map(function(k){return '<option>'+k+'</option>'}).join('');
draw();render();
function hx(t){
 if(window.crypto&&crypto.subtle)return crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return ('0'+x.toString(16)).slice(-2)}).join('')});
 return Promise.resolve(btoa(unescape(encodeURIComponent(t))));
}
function acct(){return {u:'30ad98d447eab3a38bc5860ac98b918c57bba0c51b4feb0827aaccb2923a9c38',p:'24d1336e6d93582592d43cad1dc32e8031c08982688072e2fa0ed9107ee2512e'}}
function setAuth(){document.body.classList.remove('locked');try{sessionStorage.setItem('hdi_ok','1')}catch(e){}}
var EYE='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',EYEOFF='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/></svg>';
function togglePw(){
 var i=$('lp'),h=i.type=='password';
 i.type=h?'text':'password';
 $('eye').innerHTML=h?EYE:EYEOFF;
 $('eye').setAttribute('aria-label',h?'Sembunyikan password':'Tampilkan password');
}
function initLogin(){
 $('lp').type='password';$('eye').innerHTML=EYEOFF;
 var a=acct();
 $('lt').textContent=a?'Masuk':'Buat Akun Baru';
 $('lh').textContent=a?'Masukkan username dan password Anda.':'Buat username dan password untuk pertama kali.';
 $('lb').textContent=a?'Masuk':'Buat Akun';
 $('lp2w').style.display='none';
 $('lp').setAttribute('autocomplete',a?'current-password':'new-password');
 $('le').textContent='';$('lu').value='';$('lp').value='';$('lp2').value='';
}
function doLogin(){
 var u=$('lu').value.trim().toLowerCase(),p=$('lp').value,a=acct();
 if(!u||!p){$('le').textContent='Username dan password wajib diisi.';return}
 if(!a){
  if(p.length<4){$('le').textContent='Password minimal 4 karakter.';return}
  if(p!==$('lp2').value){$('le').textContent='Ulangi password tidak sama.';return}
  Promise.all([hx(u),hx(p)]).then(function(h){try{localStorage.setItem('hdi_acc',JSON.stringify({u:h[0],p:h[1]}))}catch(e){}setAuth();initLogin()});
 }else{
  Promise.all([hx(u),hx(p)]).then(function(h){
   if(h[0]===a.u&&h[1]===a.p){setAuth();initLogin()}else{$('le').textContent='Username atau password salah.'}
  });
 }
}
function logout(){try{sessionStorage.removeItem('hdi_ok')}catch(e){}document.body.classList.add('locked');initLogin()}
document.addEventListener('keydown',function(e){if(e.key=='Enter'&&document.body.classList.contains('locked'))doLogin();if(e.key=='Escape'){closePay();closeDel();closeMod()}});
try{if(sessionStorage.getItem('hdi_ok')&&acct())document.body.classList.remove('locked')}catch(e){}
initLogin();
