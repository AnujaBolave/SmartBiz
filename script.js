const $=id=>document.getElementById(id);
const KEYS={products:'smartbiz_products_v1',budget:'smartbiz_budget_v1',lang:'smartbiz_lang_v1'};
let products=[],budget=3000,lang='en';
try{products=JSON.parse(localStorage.getItem(KEYS.products)||'[]');if(!Array.isArray(products))products=[];budget=Number(localStorage.getItem(KEYS.budget)??3000);lang=localStorage.getItem(KEYS.lang)||'en'}catch(e){products=[];budget=3000}
const translations={
en:{tagline:'Smart buying decisions for local shops',heroTitle:'Buy smarter. Waste less.',heroText:'Know what to restock first, how much to buy, and whether your budget is enough — all in one simple place.',s1label:'Products tracked',s1hint:'Items in your shop',s2label:'Low stock',s2hint:'Less than 7 days left',s3label:'Buying budget',s3hint:'Your available amount',s4label:'Recommended spend',s4hint:'Within your budget',addTitle:'＋ Add a product',addSub:'Enter stock and sales details to get a buying suggestion.',lName:'Product name *',lStock:'Current stock (units) *',lSales:'Average sold per day *',lBuy:'Purchase price per unit (₹) *',lSell:'Selling price per unit (₹)',lTarget:'Target stock (units) *',lExpiry:'Expiry date (optional)',saveProduct:'Add product',clearForm:'Clear',inventoryTitle:'Your inventory',inventorySub:'Stock health is based on average daily sales.',saved:'Saved on this device',budgetTitle:'₹ Buying budget',budgetSub:'Set how much you can spend on restocking.',lBudget:'Available budget (₹)',saveBudget:'Save budget',budgetNote:'Recommendations prioritise products with fewer days of stock remaining. Suggested quantities are capped by your target stock and budget.',recTitle:'✨ Smart buying plan',recSub:'A suggested order for your next purchase.',expiryTitle:'⏳ Expiry watch',expirySub:'Products expiring within 30 days.',footText:'SmartBiz • Demo-ready prototype • Data stays in this browser on this device',emptyInv:'No products yet. Add your first product above to start your smart buying plan.',emptyRec:'Add products to see which items should be bought first.',emptyExp:'No products expiring within the next 30 days.',days:'days of stock',buy:'Buy',cost:'Estimated cost',priority:'Priority',high:'BUY FIRST',medium:'PLAN SOON',ok:'ENOUGH STOCK',low:'Low stock',watch:'Watch',good:'Healthy',edit:'Edit',delete:'Delete',confirmDelete:'Delete this product?',budgetSaved:'Budget saved!',productAdded:'Product added!',productUpdated:'Product updated!',productDeleted:'Product deleted.',needBudget:'Enter a valid budget.',within:'Budget used',short:'Short by',noBuy:'No purchase needed right now based on current targets.',stock:'Stock',target:'Target',perDay:'sold/day',expiring:'Expires in',expired:'Expired',today:'today',tomorrow:'1 day',priorityReason:'Only',daysLeft:'days left',units:'units',budgetLimit:'Budget limit reached',planned:'Planned purchase',profit:'Unit margin',exported:'CSV downloaded.'},
hi:{tagline:'स्थानीय दुकानों के लिए स्मार्ट खरीदारी',heroTitle:'समझदारी से खरीदें। बर्बादी घटाएँ।',heroText:'पहले क्या खरीदें, कितनी मात्रा में खरीदें और बजट पर्याप्त है या नहीं — एक ही जगह जानें।',s1label:'कुल उत्पाद',s1hint:'आपकी दुकान के आइटम',s2label:'कम स्टॉक',s2hint:'7 दिन से कम स्टॉक',s3label:'खरीद बजट',s3hint:'उपलब्ध राशि',s4label:'खरीद का खर्च',s4hint:'आपके बजट के अंदर',addTitle:'＋ उत्पाद जोड़ें',addSub:'खरीद सुझाव पाने के लिए स्टॉक और बिक्री भरें।',lName:'उत्पाद का नाम *',lStock:'मौजूदा स्टॉक (यूनिट) *',lSales:'औसत दैनिक बिक्री *',lBuy:'प्रति यूनिट खरीद मूल्य (₹) *',lSell:'प्रति यूनिट बिक्री मूल्य (₹)',lTarget:'लक्षित स्टॉक (यूनिट) *',lExpiry:'एक्सपायरी तारीख (वैकल्पिक)',saveProduct:'उत्पाद जोड़ें',clearForm:'साफ करें',inventoryTitle:'आपका स्टॉक',inventorySub:'स्टॉक की स्थिति दैनिक बिक्री पर आधारित है।',saved:'इस डिवाइस में सेव',budgetTitle:'₹ खरीद बजट',budgetSub:'स्टॉक खरीदने के लिए बजट सेट करें।',lBudget:'उपलब्ध बजट (₹)',saveBudget:'बजट सेव करें',budgetNote:'कम दिनों का स्टॉक वाले उत्पाद पहले सुझाए जाते हैं। मात्रा लक्ष्य और बजट के अनुसार सीमित है।',recTitle:'✨ स्मार्ट खरीद योजना',recSub:'अगली खरीद के लिए सुझाव।',expiryTitle:'⏳ एक्सपायरी अलर्ट',expirySub:'अगले 30 दिनों में एक्सपायर होने वाले उत्पाद।',footText:'SmartBiz • डेमो प्रोटोटाइप • डेटा इसी ब्राउज़र में रहता है',emptyInv:'अभी उत्पाद नहीं हैं। ऊपर पहला उत्पाद जोड़ें।',emptyRec:'खरीद सुझाव देखने के लिए उत्पाद जोड़ें।',emptyExp:'अगले 30 दिनों में कोई एक्सपायरी नहीं।',days:'दिन का स्टॉक',buy:'खरीदें',cost:'अनुमानित खर्च',priority:'प्राथमिकता',high:'पहले खरीदें',medium:'जल्द योजना',ok:'स्टॉक पर्याप्त',low:'कम स्टॉक',watch:'ध्यान दें',good:'ठीक',edit:'बदलें',delete:'हटाएँ',confirmDelete:'यह उत्पाद हटाएँ?',budgetSaved:'बजट सेव हुआ!',productAdded:'उत्पाद जोड़ा गया!',productUpdated:'उत्पाद अपडेट हुआ!',productDeleted:'उत्पाद हटाया गया।',needBudget:'सही बजट डालें।',within:'बजट उपयोग',short:'कम',noBuy:'अभी खरीद की जरूरत नहीं।',stock:'स्टॉक',target:'लक्ष्य',perDay:'बिक्री/दिन',expiring:'एक्सपायर',expired:'एक्सपायर हो चुका',today:'आज',tomorrow:'1 दिन',priorityReason:'केवल',daysLeft:'दिन बाकी',units:'यूनिट',budgetLimit:'बजट सीमा पूरी',planned:'योजना की खरीद',profit:'प्रति यूनिट मार्जिन',exported:'CSV डाउनलोड हुआ।'},
mr:{tagline:'स्थानिक दुकानांसाठी स्मार्ट खरेदी',heroTitle:'हुशारीने खरेदी करा. अपव्यय कमी करा.',heroText:'आधी काय खरेदी करायचे, किती खरेदी करायचे आणि बजेट पुरेसे आहे का — एका ठिकाणी जाणून घ्या.',s1label:'एकूण उत्पादने',s1hint:'दुकानातील वस्तू',s2label:'कमी साठा',s2hint:'7 दिवसांपेक्षा कमी साठा',s3label:'खरेदी बजेट',s3hint:'उपलब्ध रक्कम',s4label:'सुचवलेला खर्च',s4hint:'बजेटमध्ये',addTitle:'＋ उत्पादन जोडा',addSub:'खरेदीचा सल्ला मिळवण्यासाठी साठा आणि विक्री भरा.',lName:'उत्पादनाचे नाव *',lStock:'सध्याचा साठा (युनिट) *',lSales:'दररोजची सरासरी विक्री *',lBuy:'प्रति युनिट खरेदी किंमत (₹) *',lSell:'प्रति युनिट विक्री किंमत (₹)',lTarget:'लक्ष्य साठा (युनिट) *',lExpiry:'एक्सपायरी तारीख (पर्यायी)',saveProduct:'उत्पादन जोडा',clearForm:'पुसून टाका',inventoryTitle:'तुमचा साठा',inventorySub:'साठ्याची स्थिती दररोजच्या विक्रीवर आधारित आहे.',saved:'या डिव्हाइसवर सेव्ह',budgetTitle:'₹ खरेदी बजेट',budgetSub:'नवीन साठ्यासाठी बजेट ठरवा.',lBudget:'उपलब्ध बजेट (₹)',saveBudget:'बजेट सेव्ह करा',budgetNote:'कमी दिवसांचा साठा असलेल्या वस्तूंना आधी प्राधान्य मिळते. खरेदीचे प्रमाण लक्ष्य आणि बजेटनुसार मर्यादित असते.',recTitle:'✨ स्मार्ट खरेदी योजना',recSub:'पुढील खरेदीसाठी सूचना.',expiryTitle:'⏳ एक्सपायरी सूचना',expirySub:'पुढील 30 दिवसांत एक्सपायर होणारी उत्पादने.',footText:'SmartBiz • डेमो प्रोटोटाइप • डेटा या ब्राउझरमध्ये राहतो',emptyInv:'अजून उत्पादने नाहीत. वर पहिले उत्पादन जोडा.',emptyRec:'खरेदी सूचना पाहण्यासाठी उत्पादने जोडा.',emptyExp:'पुढील 30 दिवसांत एक्सपायरी नाही.',days:'दिवसांचा साठा',buy:'खरेदी',cost:'अंदाजे खर्च',priority:'प्राधान्य',high:'आधी खरेदी',medium:'लवकर नियोजन',ok:'साठा पुरेसा',low:'कमी साठा',watch:'लक्ष द्या',good:'योग्य',edit:'बदला',delete:'काढा',confirmDelete:'हे उत्पादन काढायचे?',budgetSaved:'बजेट सेव्ह झाले!',productAdded:'उत्पादन जोडले!',productUpdated:'उत्पादन अपडेट झाले!',productDeleted:'उत्पादन काढले.',needBudget:'योग्य बजेट भरा.',within:'बजेट वापर',short:'कमी',noBuy:'सध्या खरेदीची गरज नाही.',stock:'साठा',target:'लक्ष्य',perDay:'विक्री/दिवस',expiring:'एक्सपायर',expired:'एक्सपायर झाले',today:'आज',tomorrow:'1 दिवस',priorityReason:'फक्त',daysLeft:'दिवस बाकी',units:'युनिट',budgetLimit:'बजेट मर्यादा पूर्ण',planned:'नियोजित खरेदी',profit:'प्रति युनिट मार्जिन',exported:'CSV डाउनलोड झाले.'}
};
function t(k){return (translations[lang]&&translations[lang][k])||translations.en[k]||k}
function money(n){return '₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2})}
function num(n){return Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:1})}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function persist(){try{localStorage.setItem(KEYS.products,JSON.stringify(products));localStorage.setItem(KEYS.budget,String(budget));localStorage.setItem(KEYS.lang,lang)}catch(e){toast('Could not save in this browser. Export your CSV as a backup.')}}
function toast(msg){$('toast').textContent=msg;$('toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').style.display='none',2600)}
function daysLeft(p){return p.sales>0?p.stock/p.sales:Infinity}
function need(p){return Math.max(0,Math.ceil(p.target-p.stock))}
function getPlan(){
 let remaining=Math.max(0,budget),plan=[];
 const sorted=[...products].map(p=>({...p,days:daysLeft(p),need:need(p)})).sort((a,b)=>a.days-b.days);
 for(const p of sorted){
  let qty=0;
  if(p.need>0&&p.buy>0&&remaining>0){qty=Math.min(p.need,Math.floor((remaining+1e-8)/p.buy));}
  const cost=qty*p.buy;
  remaining-=cost;
  const priority=p.days<3?'high':p.days<7?'medium':'ok';
  plan.push({...p,qty,cost,priority});
 }
 return {plan,spent:budget-remaining,remaining};
}
function render(){
 const {plan,spent}=getPlan(),low=products.filter(p=>daysLeft(p)<7).length;
 $('statProducts').textContent=products.length;$('statLow').textContent=low;$('statBudget').textContent=money(budget);$('statSpend').textContent=money(spent);
 $('budgetInput').value=budget;
 if(!products.length){$('inventoryTable').innerHTML=`<div class="empty"><div class="empty-icon">📦</div>${t('emptyInv')}</div>`}
 else{
  const rows=products.map(p=>{let d=daysLeft(p),state=d<7?'low':d<14?'watch':'good',status=d<7?t('low'):d<14?t('watch'):t('good');return `<tr><td><strong>${esc(p.name)}</strong>${p.expiry?`<span class="muted">Exp: ${esc(p.expiry)}</span>`:''}</td><td>${num(p.stock)}<span class="muted">${t('target')}: ${num(p.target)}</span></td><td>${num(p.sales)}</td><td>${money(p.buy)}</td><td>${d===Infinity?'—':num(d)+' '+t('days')}</td><td><span class="status ${state}">${status}</span></td><td><button class="secondary small-btn" data-edit="${p.id}">${t('edit')}</button> <button class="danger small-btn" data-delete="${p.id}">${t('delete')}</button></td></tr>`}).join('');
  $('inventoryTable').innerHTML=`<div class="table-wrap"><table><thead><tr><th>${t('lName').replace(' *','')}</th><th>${t('stock')}</th><th>${t('perDay')}</th><th>${t('lBuy').replace(' *','')}</th><th>${t('days')}</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>`;
 }
 const recommended=plan.filter(p=>p.qty>0);
 if(!products.length){$('recommendations').innerHTML=`<div class="empty"><div class="empty-icon">🧠</div>${t('emptyRec')}</div>`}
 else if(!recommended.length){$('recommendations').innerHTML=`<div class="empty">${t('noBuy')}<br><br>${t('within')}: <strong>${money(spent)}</strong></div>`}
 else{
  $('recommendations').innerHTML=recommended.map((p,i)=>`<div class="recommendation"><div class="rec-top"><div class="rec-name">${i+1}. ${esc(p.name)}</div><span class="tag ${p.priority}">${t(p.priority)}</span></div><div class="rec-meta">${p.days===Infinity?'No daily sales entered':`${t('priorityReason')} ${num(p.days)} ${t('daysLeft')}`} · ${t('stock')}: ${num(p.stock)} · ${t('target')}: ${num(p.target)}</div><div class="rec-bottom"><span>${t('buy')} <strong>${num(p.qty)} ${t('units')}</strong><br><small>${t('cost')}: ${money(p.cost)}</small></span><span>${money(p.buy)} <small>/ unit</small></span></div></div>`).join('')+`<div class="budget-note"><strong>${t('within')}: ${money(spent)}</strong> / ${money(budget)}${spent>=budget&&plan.some(p=>p.need>0&&p.qty===0)?` · ${t('budgetLimit')}`:''}</div>`;
 }
 const now=new Date();now.setHours(0,0,0,0);const soon=products.filter(p=>p.expiry).map(p=>({...p,expDays:Math.ceil((new Date(p.expiry+'T00:00:00')-now)/86400000)})).filter(p=>p.expDays<=30).sort((a,b)=>a.expDays-b.expDays);
 $('expiryList').innerHTML=soon.length?`<div class="expiry-list">${soon.map(p=>`<div class="expiry-item"><div class="expiry-icon">⏳</div><div><strong>${esc(p.name)}</strong><small>${p.expDays<0?t('expired'):p.expDays===0?t('today'):p.expDays===1?t('tomorrow'):`${t('expiring')} ${p.expDays} days`} · ${esc(p.expiry)}</small></div></div>`).join('')}</div>`:`<div class="expiry-empty">${t('emptyExp')}</div>`;
}
function setLanguage(){
 const keys=['tagline','heroTitle','heroText','s1label','s1hint','s2label','s2hint','s3label','s3hint','s4label','s4hint','addTitle','addSub','lName','lStock','lSales','lBuy','lSell','lTarget','lExpiry','saveProduct','clearForm','inventoryTitle','inventorySub','budgetTitle','budgetSub','lBudget','saveBudget','budgetNote','recTitle','recSub','expiryTitle','expirySub','footText'];
 keys.forEach(k=>{let el=$(k);if(el)el.textContent=t(k)});$('saveBadge').textContent=t('saved');document.documentElement.lang=lang;render()
}
$('language').value=['en','hi','mr'].includes(lang)?lang:'en';lang=$('language').value;
$('language').addEventListener('change',e=>{lang=e.target.value;persist();setLanguage()});
$('productForm').addEventListener('submit',e=>{e.preventDefault();const p={id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),name:$('pName').value.trim(),stock:Number($('pStock').value),sales:Number($('pSales').value),buy:Number($('pBuy').value),sell:Number($('pSell').value||0),target:Number($('pTarget').value),expiry:$('pExpiry').value||''};if(!p.name||[p.stock,p.sales,p.buy,p.target].some(v=>!Number.isFinite(v)||v<0)){toast('Please enter valid non-negative values.');return}products.push(p);persist();render();e.target.reset();$('pName').focus();toast(t('productAdded'))});
$('saveBudget').addEventListener('click',()=>{const v=Number($('budgetInput').value);if(!Number.isFinite(v)||v<0){toast(t('needBudget'));return}budget=v;persist();render();toast(t('budgetSaved'))});
$('inventoryTable').addEventListener('click',e=>{const del=e.target.closest('[data-delete]'),edit=e.target.closest('[data-edit]');if(del){const p=products.find(x=>x.id===del.dataset.delete);if(p&&confirm(`${t('confirmDelete')} (${p.name})`)){products=products.filter(x=>x.id!==p.id);persist();render();toast(t('productDeleted'))}}if(edit){const p=products.find(x=>x.id===edit.dataset.edit);if(!p)return;['id','name','stock','sales','buy','sell','target','expiry'].forEach(k=>{$('edit'+k[0].toUpperCase()+k.slice(1)).value=p[k]??''});$('editModal').style.display='grid';$('eName').focus()}});
$('cancelEdit').addEventListener('click',()=>$('editModal').style.display='none');
$('editModal').addEventListener('click',e=>{if(e.target===$('editModal'))$('editModal').style.display='none'});
$('editForm').addEventListener('submit',e=>{e.preventDefault();const id=$('editId').value;const p=products.find(x=>x.id===id);if(!p)return;Object.assign(p,{name:$('eName').value.trim(),stock:Number($('eStock').value),sales:Number($('eSales').value),buy:Number($('eBuy').value),sell:Number($('eSell').value||0),target:Number($('eTarget').value),expiry:$('eExpiry').value||''});persist();render();$('editModal').style.display='none';toast(t('productUpdated'))});
function downloadCsv(filename, rows){
 const csv=rows.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
 const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('templateBtn').addEventListener('click',()=>{
 const rows=[['Product Name','Current Stock','Average Sold Per Day','Purchase Price','Selling Price','Target Stock','Expiry Date'],['Chocolate',4,5,60,80,30,'2026-11-15'],['Rice',5,2,40,50,20,'']];
 downloadCsv('smartbiz-import-template.csv',rows);toast('CSV template downloaded. Replace the sample rows with your products.');
});
$('chooseCsvBtn').addEventListener('click',()=>$('csvFile').click());
function parseCsv(text){
 const rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&quoted&&n==='"'){cell+='"';i++}else if(c==='"'){quoted=!quoted}else if(c===','&&!quoted){row.push(cell.trim());cell=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());if(row.some(v=>v!==''))rows.push(row);row=[];cell=''}else{cell+=c}}
 if(cell!==''||row.length){row.push(cell.trim());if(row.some(v=>v!==''))rows.push(row)}return rows;
}
function normalizeHeader(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
$('csvFile').addEventListener('change',async e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 try{
  const rows=parseCsv((await file.text()).replace(/^\uFEFF/,''));if(rows.length<2)throw new Error('The CSV has no product rows.');
  const headers=rows[0].map(normalizeHeader);
  const aliases={name:['productname','product','name','item'],stock:['currentstock','stock','quantity','currentquantity'],sales:['averagesoldperday','soldperday','averagedailysales','dailysales','salesperday'],buy:['purchaseprice','purchasepriceperunit','buyprice','costprice'],sell:['sellingprice','sellingpriceperunit','sellprice'],target:['targetstock','targetquantity','desiredstock'],expiry:['expirydate','expiry','expirationdate']};
  const idx={};for(const key in aliases)idx[key]=headers.findIndex(h=>aliases[key].includes(h));
  const missing=['name','stock','sales','buy','target'].filter(k=>idx[k]===-1);if(missing.length)throw new Error('Missing required column(s): '+missing.map(k=>({name:'Product Name',stock:'Current Stock',sales:'Average Sold Per Day',buy:'Purchase Price',target:'Target Stock'}[k])).join(', '));
  let added=0,updated=0,skipped=0;const problems=[];
  rows.slice(1).forEach((r,i)=>{
   const val=k=>idx[k]===-1?'':String(r[idx[k]]??'').trim();const name=val('name');if(!name){skipped++;problems.push('Row '+(i+2)+': missing product name');return}
   const nums={stock:Number(val('stock')),sales:Number(val('sales')),buy:Number(val('buy')),target:Number(val('target')),sell:val('sell')===''?0:Number(val('sell'))};
   if(['stock','sales','buy','target','sell'].some(k=>!Number.isFinite(nums[k])||nums[k]<0)){skipped++;problems.push('Row '+(i+2)+': invalid or negative number');return}
   const expiry=val('expiry');if(expiry&&!/^\d{4}-\d{2}-\d{2}$/.test(expiry)){skipped++;problems.push('Row '+(i+2)+': expiry must be YYYY-MM-DD');return}
   const existing=products.find(p=>p.name.trim().toLowerCase()===name.toLowerCase());const item={id:existing?existing.id:Date.now().toString(36)+Math.random().toString(36).slice(2,8),name,stock:nums.stock,sales:nums.sales,buy:nums.buy,sell:nums.sell,target:nums.target,expiry};
   if(existing){Object.assign(existing,item);updated++}else{products.push(item);added++}
  });
  persist();render();const msg=`Import complete: ${added} added, ${updated} updated, ${skipped} skipped.`;$('importStatus').textContent=msg+(problems.length?' Details: '+problems.slice(0,4).join('; ')+(problems.length>4?'…':''):'');toast(msg);
 }catch(err){$('importStatus').textContent='Import failed: '+err.message;toast('Import failed. Check the CSV headers and values.')}finally{e.target.value=''}
});

// Supplier bill workflow (rewritten: fixes the "Please review the bill" bug)
// Root cause: the old code called $('[data-bill-name="0"]'), but $ is getElementById, so every field read as empty.
const BILL_KEY='smartbiz_imported_bills';
let billRows=[],billErrors={},applying=false;
const nk=s=>String(s||'').trim().replace(/\s+/g,' ').toLowerCase();
const r3=n=>Math.round(n*1000)/1000;
function importedSigs(){try{return JSON.parse(localStorage.getItem(BILL_KEY)||'[]')}catch(e){return[]}}
function saveSig(s){try{const a=importedSigs();a.push(s);localStorage.setItem(BILL_KEY,JSON.stringify(a.slice(-50)));return true}catch(e){return false}}
function billSig(rows){return rows.map(r=>nk(r.name)+'|'+r3(Number(r.qty))+'|'+r3(Number(r.price))).sort().join(';')}
function setBillMsg(type,text){const m=$('billMsg');m.className='bill-msg '+type;m.textContent=text;m.style.display=text?'block':'none'}
function numOrNaN(v){return (v===''||v==null)?NaN:Number(v)}
function validateBill(rows){
 const errs={},list=[],seen={};
 if(!rows.length){list.push('The bill has no product rows. Add a row or use Try Demo Bill.');return{errs,list}}
 rows.forEach((r,i)=>{const e={},n=i+1,k=nk(r.name);
  if(!k)e.name='Row '+n+': product name is required.';
  else if(seen[k]!==undefined)e.name='Row '+n+': "'+String(r.name).trim()+'" is repeated (also row '+(seen[k]+1)+'). Combine them into one row.';
  else seen[k]=i;
  const q=numOrNaN(r.qty),p=numOrNaN(r.price);
  if(!Number.isFinite(q)||q<=0)e.qty='Row '+n+': quantity must be a number greater than 0.';
  if(!Number.isFinite(p)||p<=0)e.price='Row '+n+': unit purchase price must be a number greater than 0.';
  if(Object.keys(e).length){errs[i]=e;Object.values(e).forEach(x=>list.push(x))}});
 return{errs,list}}
function updateBillTotals(){
 let total=0;billRows.forEach((r,i)=>{const q=Number(r.qty),p=Number(r.price),lt=(q>0&&p>0)?q*p:0;total+=lt;const c=$('lt'+i);if(c)c.innerHTML='<strong>'+money(lt)+'</strong>'});
 const t=$('billTotal');if(t)t.innerHTML='Bill total: <strong>'+money(total)+'</strong> for '+billRows.length+' product row(s)'}
function drawBill(){
 const box=$('billRows');$('billReview').style.display='block';
 if(!billRows.length){box.innerHTML='<div class="empty">No product rows yet. Add a row manually or use Try Demo Bill.</div><div class="form-actions"><button type="button" class="secondary" id="addBillRowBtn">+ Add row</button></div>';return}
 const inp=(r,i,f,num,w)=>{const e=(billErrors[i]||{})[f];return `<input data-f="${f}" data-i="${i}" ${num?'type="number" min="0" step="any" inputmode="decimal"':'type="text" maxlength="60"'} value="${esc(r[f])}" aria-label="${f} row ${i+1}" class="${e?'bad':''}" style="width:${w}px;padding:7px;border:1px solid #dce2ed;border-radius:7px">${e?`<div class="bill-err">${esc(e)}</div>`:''}`};
 box.innerHTML='<div class="table-wrap"><table style="min-width:640px"><thead><tr><th>Product</th><th>Quantity received</th><th>Unit purchase price ₹</th><th>Line total</th><th></th></tr></thead><tbody>'+billRows.map((r,i)=>`<tr><td>${inp(r,i,'name',false,170)}</td><td>${inp(r,i,'qty',true,90)}</td><td>${inp(r,i,'price',true,100)}</td><td id="lt${i}"></td><td><button type="button" class="danger small-btn" data-bill-remove="${i}">Remove</button></td></tr>`).join('')+'</tbody></table></div><div class="budget-note" id="billTotal"></div><div class="budget-note" id="billPreview"></div><div class="form-actions"><button type="button" class="secondary" id="addBillRowBtn">+ Add row</button></div>';
 updateBillTotals()}
$('billRows').addEventListener('input',e=>{const el=e.target;if(!el.dataset.f)return;billRows[+el.dataset.i][el.dataset.f]=el.value;el.classList.remove('bad');updateBillTotals()});
$('billRows').addEventListener('click',e=>{
 const b=e.target.closest('[data-bill-remove]');if(b){billRows.splice(+b.dataset.billRemove,1);billErrors={};drawBill();return}
 if(e.target.closest('#addBillRowBtn')){billRows.push({name:'',qty:'',price:''});billErrors={};drawBill()}});
$('demoBillBtn').addEventListener('click',()=>{
 billRows=[{name:'Chocolate',qty:20,price:60},{name:'Rice',qty:50,price:40},{name:'Biscuits',qty:30,price:10}];billErrors={};
 $('ocrBox').style.display='none';$('ocrText').value='';$('ocrStatus').textContent='Demo bill loaded (not a real scan).';
 setBillMsg('info','Demo bill loaded. Check the rows, then select "Confirm and update stock". Stock is not changed until you confirm.');drawBill()});
$('resetBillHistory').addEventListener('click',()=>{try{localStorage.removeItem(BILL_KEY)}catch(e){}setBillMsg('info','Import history cleared. A bill can be confirmed again.')});
$('applyBillBtn').addEventListener('click',()=>{
 if(applying)return;
 const v=validateBill(billRows);
 if(v.list.length){billErrors=v.errs;drawBill();setBillMsg('error','Stock was NOT updated. Fix '+v.list.length+' problem(s):\n• '+v.list.join('\n• '));return}
 const sig=billSig(billRows);
 if(importedSigs().includes(sig)){setBillMsg('error','This bill was already imported on this device, so stock was NOT changed again. If this is a genuinely new delivery with identical items, select "Reset import history" and confirm again.');return}
 applying=true;$('applyBillBtn').disabled=true;
 const before=JSON.stringify(products),budgetBefore=budget;
 try{
  const next=JSON.parse(before);let added=0,updated=0,units=0,cost=0;
  billRows.forEach(r=>{const q=r3(Number(r.qty)),pr=Number(r.price),nm=String(r.name).trim().replace(/\s+/g,' '),ex=next.find(p=>nk(p.name)===nk(nm));units+=q;cost+=q*pr;
   if(ex){ex.stock=r3(Number(ex.stock||0)+q);ex.buy=pr;updated++}
   else{next.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,8),name:nm,stock:q,sales:0,buy:pr,sell:0,target:q,expiry:''});added++}});
  localStorage.setItem(KEYS.products,JSON.stringify(next));
  products=next;let bNote='';if($('deductBudget').checked){const oldB=budget;budget=Math.max(0,Math.round((budget-cost)*100)/100);persist();bNote=' Budget: '+money(oldB)+' → '+money(budget)+(cost>oldB?' (the bill was more than your budget, so it is now ₹0)':'')+'.'}saveSig(sig);render();$('deductBudget').checked=true;
  billRows=[];billErrors={};$('billReview').style.display='none';$('billRows').innerHTML='';$('ocrText').value='';
  setBillMsg('success','Stock updated: '+added+' new product(s) added, '+updated+' existing product(s) increased ('+num(units)+' units, '+money(cost)+'). Alerts and the buying plan have been recalculated.'+bNote);
  toast('Stock received and saved.');
 }catch(err){products=JSON.parse(before);budget=budgetBefore;render();setBillMsg('error','Stock was NOT updated because this browser could not save the data ('+err.message+'). Nothing was changed.')}
 finally{applying=false;$('applyBillBtn').disabled=false}});

// OCR: best-effort only. Failures are reported, nothing is applied without confirmation.
function billCandidateLines(text){
 return text.split(/\r?\n/).map(l=>l.replace(/\s+/g,' ').trim()).filter(line=>{
  const words=line.match(/[A-Za-z\u0900-\u097F]{2,}/g)||[],nums=line.match(/\d+(?:[.,]\d{1,2})?/g)||[];
  return words.join('').length>=2&&nums.length>=1&&!/^(invoice|bill|date|gstin|subtotal|total|tax|amount|phone|address|thank|cash|balance|discount)/i.test(line)}).slice(0,60).map(line=>{
  const n=(line.match(/\d+(?:[.,]\d{1,2})?/g)||[]).map(x=>Number(x.replace(',','.'))).filter(Number.isFinite),L=n.length;let qty='',price='';
  if(L>=3&&Math.abs(n[L-3]*n[L-2]-n[L-1])<=Math.max(1,n[L-1]*0.02)){qty=n[L-3];price=n[L-2]}
  else if(L>=2){qty=n[L-2];price=n[L-1]}
  const name=line.replace(/\b\d+(?:[.,]\d{1,2})?\b/g,' ').replace(/[^\p{L}\p{N} &()./-]/gu,' ').replace(/\s+/g,' ').trim().slice(0,60);
  return{name,qty,price}}).filter(x=>x.name)}
$('scanBillBtn').addEventListener('click',()=>$('billImage').click());
$('parseBillBtn').addEventListener('click',()=>{billRows=billCandidateLines($('ocrText').value);billErrors={};drawBill();setBillMsg(billRows.length?'info':'error',billRows.length?'Found '+billRows.length+' possible product line(s). These are guesses: check every name, quantity and price.':'No product lines found in the text. Correct the text, or add rows manually.')});
$('billImage').addEventListener('change',async e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!file.type.startsWith('image/')){setBillMsg('error','That file is not an image. Upload a JPG or PNG photo of the bill.');e.target.value='';return}
 $('ocrStatus').textContent='Reading bill image… keep this page open.';setBillMsg('','');
 try{
  if(!window.Tesseract){await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';s.onload=ok;s.onerror=()=>no(new Error('The OCR engine could not be downloaded. OCR needs an internet connection.'));document.head.appendChild(s)})}
  const res=await window.Tesseract.recognize(file,'eng+hin',{logger:m=>{if(m.status==='recognizing text')$('ocrStatus').textContent='Reading bill… '+Math.round((m.progress||0)*100)+'%'}});
  const text=(res.data&&res.data.text||'').trim(),conf=Math.round((res.data&&res.data.confidence)||0);
  $('ocrBox').style.display='block';$('ocrText').value=text;$('billReview').style.display='block';
  if(!text){billRows=[];drawBill();$('ocrStatus').textContent='OCR finished but found no text.';setBillMsg('error','No text could be read from this photo. Try a sharper, well-lit photo, or add rows manually / use Try Demo Bill.');return}
  billRows=billCandidateLines(text);billErrors={};drawBill();$('ocrStatus').textContent='OCR finished (confidence about '+conf+'%).';
  setBillMsg(conf<60||!billRows.length?'error':'info',(conf<60?'Low OCR confidence ('+conf+'%). ':'')+(billRows.length?billRows.length+' possible line(s) found. These are guesses: check every name, quantity and price. Stock is not changed until you confirm.':'No product lines could be detected. Correct the text above and select Re-detect, or add rows manually.'))
 }catch(err){$('ocrStatus').textContent='Could not read the bill.';setBillMsg('error','Bill reading failed: '+err.message+' You can still add rows manually or use Try Demo Bill.')}
 finally{e.target.value=''}});

$('exportBtn').addEventListener('click',()=>{const header=['Product','Current Stock','Average Sold Per Day','Purchase Price','Selling Price','Target Stock','Expiry Date','Days of Stock','Recommended Buy Qty','Estimated Cost'];const plan=getPlan().plan;const rows=plan.map(p=>[p.name,p.stock,p.sales,p.buy,p.sell,p.target,p.expiry,p.days===Infinity?'':p.days,p.qty,p.cost]);const csv=[header,...rows].map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='smartbiz-inventory.csv';a.click();URL.revokeObjectURL(a.href);toast(t('exported'))});
// ===== v3: navigation, dashboard, inventory tools, recommendation table, reports (adds on top of existing logic) =====
const NEW={
en:{nDash:'Dashboard',nInv:'Inventory',nRecv:'Receive Stock',nRecs:'Buying Recommendations',nRep:'Reports',s5label:'Near expiry',s5hint:'Within 30 days or expired',lowTitle:'Low-stock alerts',lowEmpty:'No low-stock items. Every product has 7+ days of stock.',searchPh:'Search products…',sAdded:'Sort: order added',sName:'Sort: name A–Z',sDays:'Sort: days of stock (lowest)',sStock:'Sort: stock (lowest)',sExp:'Sort: expiry (soonest)',fAll:'All products',fLow:'Low stock',fExp:'Near expiry',fOk:'Healthy',showing:'Showing',noMatch:'No products match your search or filter.',colProduct:'Product',colPriority:'Priority',colDays:'Days left',colQty:'Qty to buy',colUnit:'Unit price',colTotal:'Total cost',colRemain:'Budget remaining',partial:'of',noPrice:'Add a purchase price for',repTitle:'Reports',rInv:'Stock value (at purchase price)',rBuy:'Products to buy',rExportT:'↓ Export CSV',stepsT:'Step 1: load a bill (photo or demo). Step 2: check and edit every row. Step 3: confirm. Stock changes only at step 3.',preview:'What will change',deductT:'Deduct this bill total from my buying budget'},
hi:{nDash:'डैशबोर्ड',nInv:'स्टॉक',nRecv:'माल प्राप्ति',nRecs:'खरीद सुझाव',nRep:'रिपोर्ट',s5label:'एक्सपायरी नज़दीक',s5hint:'30 दिन में या एक्सपायर',lowTitle:'कम स्टॉक अलर्ट',lowEmpty:'कोई कम स्टॉक नहीं। सभी में 7+ दिन का स्टॉक है।',searchPh:'उत्पाद खोजें…',sAdded:'क्रम: जोड़ने का क्रम',sName:'क्रम: नाम',sDays:'क्रम: कम दिन का स्टॉक',sStock:'क्रम: कम स्टॉक',sExp:'क्रम: एक्सपायरी',fAll:'सभी उत्पाद',fLow:'कम स्टॉक',fExp:'एक्सपायरी नज़दीक',fOk:'ठीक',showing:'दिख रहे',noMatch:'खोज या फ़िल्टर से कोई उत्पाद नहीं मिला।',colProduct:'उत्पाद',colPriority:'प्राथमिकता',colDays:'बचे दिन',colQty:'खरीद मात्रा',colUnit:'प्रति यूनिट भाव',colTotal:'कुल खर्च',colRemain:'बचा बजट',partial:'में से',noPrice:'खरीद मूल्य डालें:',repTitle:'रिपोर्ट',rInv:'स्टॉक मूल्य (खरीद भाव पर)',rBuy:'खरीदने योग्य उत्पाद',rExportT:'↓ CSV निर्यात',stepsT:'चरण 1: बिल लोड करें (फोटो या डेमो)। चरण 2: हर पंक्ति जांचें और बदलें। चरण 3: पुष्टि करें। स्टॉक केवल चरण 3 पर बदलता है।',preview:'क्या बदलेगा',deductT:'इस बिल की कुल रकम मेरे खरीद बजट से घटाएँ'},
mr:{nDash:'डॅशबोर्ड',nInv:'साठा',nRecv:'माल स्वीकृती',nRecs:'खरेदी सूचना',nRep:'अहवाल',s5label:'एक्सपायरी जवळ',s5hint:'30 दिवसांत किंवा एक्सपायर',lowTitle:'कमी साठा सूचना',lowEmpty:'कमी साठा नाही. सर्वांचा 7+ दिवसांचा साठा आहे.',searchPh:'उत्पादन शोधा…',sAdded:'क्रम: जोडलेला क्रम',sName:'क्रम: नाव',sDays:'क्रम: कमी दिवसांचा साठा',sStock:'क्रम: कमी साठा',sExp:'क्रम: एक्सपायरी',fAll:'सर्व उत्पादने',fLow:'कमी साठा',fExp:'एक्सपायरी जवळ',fOk:'योग्य',showing:'दाखवत आहे',noMatch:'शोध किंवा फिल्टरला जुळणारे उत्पादन नाही.',colProduct:'उत्पादन',colPriority:'प्राधान्य',colDays:'उरलेले दिवस',colQty:'खरेदी प्रमाण',colUnit:'प्रति युनिट किंमत',colTotal:'एकूण खर्च',colRemain:'उरलेले बजेट',partial:'पैकी',noPrice:'खरेदी किंमत भरा:',repTitle:'अहवाल',rInv:'साठा मूल्य (खरेदी किमतीवर)',rBuy:'खरेदी करायची उत्पादने',rExportT:'↓ CSV निर्यात',stepsT:'पायरी 1: बिल लोड करा (फोटो किंवा डेमो). पायरी 2: प्रत्येक ओळ तपासा आणि बदला. पायरी 3: पुष्टी करा. साठा फक्त पायरी 3 ला बदलतो.',preview:'काय बदलेल',deductT:'या बिलाची एकूण रक्कम माझ्या खरेदी बजेटमधून वजा करा'}};
for(const l in NEW)Object.assign(translations[l],NEW[l]);
const VKEY='smartbiz_view';
const PA=[...document.querySelectorAll('main>.panel,aside>.panel')];
const P={add:PA[0],inv:PA[1],recv:PA[2],bulk:PA[3],budget:PA[4],recs:PA[5],exp:PA[6],low:$('lowPanel'),rep:$('reportPanel')};
const hero=document.querySelector('.hero'),statsEl=document.querySelector('.stats');
const VIEWS={dashboard:[hero,statsEl,P.budget,P.low,P.exp],inventory:[P.add,P.inv,P.bulk],receive:[P.recv,P.bulk],recs:[P.budget,P.recs],reports:[P.rep,P.exp]};
let view='dashboard';
function showView(v){if(!VIEWS[v])v='dashboard';view=v;document.body.classList.toggle('view-receive',v==='receive');try{localStorage.setItem(VKEY,v)}catch(e){}
 [hero,statsEl,...Object.values(P)].forEach(el=>el.classList.add('vhide'));VIEWS[v].forEach(el=>el.classList.remove('vhide'));
 document.querySelectorAll('#mainNav button').forEach(b=>{const on=b.dataset.view===v;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});window.scrollTo(0,0)}
$('mainNav').addEventListener('click',e=>{const b=e.target.closest('button[data-view]');if(b)showView(b.dataset.view)});
function expDaysOf(p){if(!p.expiry)return null;const n=new Date();n.setHours(0,0,0,0);return Math.ceil((new Date(p.expiry+'T00:00:00')-n)/86400000)}
function applyInv(){
 const tb=document.querySelector('#inventoryTable tbody'),cnt=$('invCount');if(!tb){cnt.textContent='';return}
 const q=nk($('invSearch').value),f=$('invFilter').value,s=$('invSort').value;
 let list=[...tb.querySelectorAll('tr')].map(r=>{const b=r.querySelector('[data-edit]');const i=products.findIndex(x=>b&&x.id===b.dataset.edit);return{r,p:products[i],i}}).filter(o=>o.p);
 const d=o=>daysLeft(o.p),ed=o=>expDaysOf(o.p);
 const vis=list.filter(o=>(!q||nk(o.p.name).includes(q))&&(f==='all'||(f==='low'&&d(o)<7)||(f==='exp'&&ed(o)!==null&&ed(o)<=30)||(f==='ok'&&d(o)>=7)));
 const key={added:o=>o.i,name:o=>nk(o.p.name),days:d,stock:o=>Number(o.p.stock),expiry:o=>ed(o)===null?1e9:ed(o)}[s];
 list.sort((a,b)=>key(a)<key(b)?-1:key(a)>key(b)?1:0);
 list.forEach(o=>{tb.appendChild(o.r);o.r.style.display=vis.includes(o)?'':'none'});
 cnt.textContent=vis.length?`${t('showing')} ${vis.length} / ${list.length}`:t('noMatch')}
['invSearch','invSort','invFilter'].forEach(id=>$(id).addEventListener('input',applyInv));
function extras(){
 const near=products.filter(p=>{const d=expDaysOf(p);return d!==null&&d<=30});$('statExpiry').textContent=near.length;
 const low=products.filter(p=>daysLeft(p)<7).sort((a,b)=>daysLeft(a)-daysLeft(b));
 $('lowList').innerHTML=low.length?`<div class="table-wrap"><table><thead><tr><th>${t('colProduct')}</th><th>${t('stock')}</th><th>${t('days')}</th></tr></thead><tbody>${low.map(p=>`<tr><td><strong>${esc(p.name)}</strong></td><td>${num(p.stock)}</td><td>${num(daysLeft(p))}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">${t('lowEmpty')}</div>`;
 const g=getPlan(),rec=g.plan.filter(p=>p.qty>0);
 if(rec.length){let rem=budget;
  const rows=rec.map((p,i)=>{rem-=p.cost;return `<tr><td>${i+1}</td><td><strong>${esc(p.name)}</strong></td><td><span class="tag ${p.priority}">${t(p.priority)}</span></td><td>${p.days===Infinity?'—':num(p.days)}</td><td><strong>${num(p.qty)}</strong>${p.qty<p.need?`<span class="muted">${t('partial')} ${num(p.need)}</span>`:''}</td><td>${money(p.buy)}</td><td>${money(p.cost)}</td><td>${money(rem)}</td></tr>`}).join('');
  const unmet=g.plan.filter(p=>p.need>0&&p.qty===0&&p.buy>0),noPr=g.plan.filter(p=>p.need>0&&!(p.buy>0));
  $('recommendations').innerHTML=`<div class="table-wrap"><table style="min-width:660px"><thead><tr><th>#</th>${['colProduct','colPriority','colDays','colQty','colUnit','colTotal','colRemain'].map(k=>`<th>${t(k)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div><div class="budget-note"><strong>${t('within')}: ${money(g.spent)}</strong> / ${money(budget)} · ${t('colRemain')}: <strong>${money(g.remaining)}</strong></div>`+(unmet.length?`<div class="budget-note">${t('budgetLimit')}: ${unmet.map(p=>esc(p.name)).join(', ')}</div>`:'')+(noPr.length?`<div class="budget-note">${t('noPrice')} ${noPr.map(p=>esc(p.name)).join(', ')}</div>`:'')}
 const val=products.reduce((a,p)=>a+Number(p.stock||0)*Number(p.buy||0),0);
 $('reportBody').innerHTML=`<div class="table-wrap"><table><tbody><tr><td>${t('s1label')}</td><td><strong>${products.length}</strong></td></tr><tr><td>${t('s2label')}</td><td><strong>${low.length}</strong></td></tr><tr><td>${t('s5label')}</td><td><strong>${near.length}</strong></td></tr><tr><td>${t('rBuy')}</td><td><strong>${rec.length}</strong></td></tr><tr><td>${t('s3label')}</td><td><strong>${money(budget)}</strong></td></tr><tr><td>${t('s4label')}</td><td><strong>${money(g.spent)}</strong></td></tr><tr><td>${t('colRemain')}</td><td><strong>${money(g.remaining)}</strong></td></tr><tr><td>${t('rInv')}</td><td><strong>${money(val)}</strong></td></tr></tbody></table></div>`;
 applyInv()}
function applyLabels(){document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});$('invSearch').placeholder=t('searchPh')}
const _render=render;render=function(){_render();extras()};
const _setLang=setLanguage;setLanguage=function(){_setLang();applyLabels();extras()};
$('reportExport').addEventListener('click',()=>$('exportBtn').click());
// bill confirmation preview: shows exactly what stock will change
function bgLine(){if(!$('deductBudget').checked)return '';const tot=billRows.reduce((a,r)=>{const q=Number(r.qty),p=Number(r.price);return a+(q>0&&p>0?q*p:0)},0);return '<br><strong>'+t('s3label')+':</strong> '+money(budget)+' → '+money(Math.max(0,budget-tot))}
$('deductBudget').addEventListener('change',()=>updateBillTotals());
const _ubt=updateBillTotals;updateBillTotals=function(){_ubt();const el=$('billPreview');if(!el)return;
 el.innerHTML='<strong>'+t('preview')+':</strong><br>'+billRows.map(r=>{const q=Number(r.qty),k=nk(r.name);if(!k||!(q>0))return '';const ex=products.find(p=>nk(p.name)===k);return esc(String(r.name).trim())+': '+(ex?num(ex.stock)+' → '+num(Number(ex.stock)+q):'new product, stock '+num(q))}).filter(Boolean).join('<br>')+bgLine()};
showView((()=>{try{return localStorage.getItem(VKEY)}catch(e){return null}})()||'dashboard');

setLanguage();
