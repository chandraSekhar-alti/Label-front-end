// Wizard mock data - all values end with 'Test'
export const PRODUCT_FAMILIES = ['Ambrisentan Test','Remdesivir Test','BIC/FTC/TAF Test','EVG/COBI/FTC/TAF Test','Adefovir Dipivoxil Test','Sofosbuvir Test','Ledipasvir Test','Tenofovir Test','Emtricitabine Test','Velpatasvir Test','Amphotericin B Test','Aztreonam Test'];

const PRODUCTS_BY_FAMILY = {};
PRODUCT_FAMILIES.forEach((fam, fi) => {
  const base = fam.replace(' Test', '');
  PRODUCTS_BY_FAMILY[fam] = [
    { id: `p-${fi}-1`, name: `${base} 10 mg Tablet Test`, type: 'Tablet Test', phase: 'Marketable Test', family: fam },
    { id: `p-${fi}-2`, name: `${base} 5 mg Tablet Test`, type: 'Tablet Test', phase: 'Marketable Test', family: fam },
    { id: `p-${fi}-3`, name: `${base} Unblinded 2.5 mg Tablet Test`, type: 'Capsule Test', phase: 'Clinical Test', family: fam },
    { id: `p-${fi}-4`, name: `${base} Unblinded 5 mg Tablet Test`, type: 'Capsule Test', phase: 'Marketable Test', family: fam },
    { id: `p-${fi}-5`, name: `${base} Oral Suspension Test`, type: 'Suspension Test', phase: 'Development Test', family: fam },
  ];
});
export { PRODUCTS_BY_FAMILY };

export const CHANGE_TYPES = ['CCDS Update Test','Local Change Test','Safety Update Test','Efficacy Update Test','Regulatory Update Test'];
export const PROCESS_IMPACTED = ['Manufacturing Test','Packaging Test','Clinical Trial Test','Post-Market Test','Distribution Test'];
export const CHANGE_CATEGORIES = ['Category 1 Test','Category 2 Test','Category 3 Test','No Category Test'];
export const SIGNALS = ['Safety Signal Test','Efficacy Signal Test','Quality Signal Test','Regulatory Signal Test','No Signal Test'];
export const TRIGGER_TYPES = ['Company Initiated Test','HA Request Test','Post-Approval Commitment Test','Periodic Update Test'];

export const COUNTRIES = [
  { code:'US',name:'United States Test',region:'North America Test'},{ code:'CA',name:'Canada Test',region:'North America Test'},
  { code:'MX',name:'Mexico Test',region:'North America Test'},{ code:'BR',name:'Brazil Test',region:'South America Test'},
  { code:'AR',name:'Argentina Test',region:'South America Test'},{ code:'CL',name:'Chile Test',region:'South America Test'},
  { code:'UK',name:'United Kingdom Test',region:'Europe (Non-EU) Test'},{ code:'DE',name:'Germany Test',region:'Europe (EU) Test'},
  { code:'FR',name:'France Test',region:'Europe (EU) Test'},{ code:'IT',name:'Italy Test',region:'Europe (EU) Test'},
  { code:'ES',name:'Spain Test',region:'Europe (EU) Test'},{ code:'NL',name:'Netherlands Test',region:'Europe (EU) Test'},
  { code:'CH',name:'Switzerland Test',region:'Europe (Non-EU) Test'},{ code:'JP',name:'Japan Test',region:'Asia Pacific Test'},
  { code:'CN',name:'China Test',region:'Asia Pacific Test'},{ code:'IN',name:'India Test',region:'Asia Pacific Test'},
  { code:'KR',name:'South Korea Test',region:'Asia Pacific Test'},{ code:'AU',name:'Australia Test',region:'Asia Pacific Test'},
  { code:'SG',name:'Singapore Test',region:'Asia Pacific Test'},{ code:'ZA',name:'South Africa Test',region:'Africa Test'},
  { code:'EG',name:'Egypt Test',region:'Africa Test'},{ code:'AE',name:'UAE Test',region:'Middle East Test'},
];

const TRADE_NAMES = ['Hepsera Test','Viread Test','Letairis Test','AmBisome Test','Sovaldi Test','Harvoni Test'];
const PROCEDURES = ['National Test','Centralized Test','Mutual Recognition Test','Decentralized Test'];
const REG_STATUS = ['Approved Test','Under Review Test','Pending Test','Withdrawn Test'];
const MKT_STATUS = ['Marketed Test','Not Marketed Test','Discontinued Test'];

export const buildRegistrations = (products, countryCodes) => {
  const rows = [];
  let i = 0;
  products.forEach(p => {
    countryCodes.forEach(cc => {
      const country = COUNTRIES.find(c => c.code === cc);
      if (!country) return;
      i++;
      rows.push({
        id: `reg-${p.id}-${cc}`,
        country: country.name,
        region: country.region,
        product: p.name,
        applicationNumber: `APP-${1000 + i} Test`,
        registrationNumber: `REG-${4000 + i} Test`,
        tradeName: TRADE_NAMES[i % TRADE_NAMES.length],
        packageName: `${p.name.split(' ').slice(0,3).join(' ')} Pack Test`,
        procedureType: PROCEDURES[i % PROCEDURES.length],
        registrationStatus: REG_STATUS[i % REG_STATUS.length],
        marketStatus: MKT_STATUS[i % MKT_STATUS.length],
      });
    });
  });
  return rows;
};
