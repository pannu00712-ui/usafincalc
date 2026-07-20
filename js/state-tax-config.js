// Single source of truth for state tax calculator availability.
// To add a new state calculator: just add/edit an entry below — the
// /tax-by-state listing page and /state-tax-hub detail page both read
// from this array automatically, no other file needs to change.
window.STATE_TAX_CONFIG = [
    {
    slug: 'alaska',
    name: 'Alaska',
    income: '/alaska-tax-calculator',
    property: null,
    payroll: '/alaska-paycheck-calculator'
  },
  {
    slug: 'arizona',
    name: 'Arizona',
    income: '/arizona-tax-calculator',
    property: '/arizona-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'arkansas',
    name: 'Arkansas',
    income: '/arkansas-tax-calculator',
    property: null,
    payroll: '/arkansas-paycheck-calculator'
  },
  {
    slug: 'california',
    name: 'California',
    income: '/california-tax-calculator',
    property: '/california-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'colorado',
    name: 'Colorado',
    income: '/colorado-tax-calculator',
    property: '/colorado-property-tax-calculator',
    payroll: null
  },
    {
    slug: 'florida',
    name: 'Florida',
    income: '/florida-tax-calculator',
    property: '/florida-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'georgia',
    name: 'Georgia',
    income: '/georgia-tax-calculator',
    property: '/georgia-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'hawaii',
    name: 'Hawaii',
    income: '/hawaii-tax-calculator',
    property: null,
    payroll: '/hawaii-paycheck-calculator'
  },
  {
    slug: 'illinois',
    name: 'Illinois',
    income: '/illinois-tax-calculator',
    property: '/illinois-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'indiana',
    name: 'Indiana',
    income: '/indiana-tax-calculator',
    property: null,
    payroll: null
  },
    {
    slug: 'kansas',
    name: 'Kansas',
    income: '/kansas-tax-calculator',
    property: null,
    payroll: '/kansas-paycheck-calculator'
  },
    {
    slug: 'louisiana',
    name: 'Louisiana',
    income: '/louisiana-tax-calculator',
    property: null,
    payroll: '/louisiana-paycheck-calculator'
  },
  {
    slug: 'maryland',
    name: 'Maryland',
    income: '/maryland-tax-calculator',
    property: '/maryland-property-tax-calculator',
    payroll: '/maryland-paycheck-calculator'
  },
  {
    slug: 'massachusetts',
    name: 'Massachusetts',
    income: '/massachusetts-tax-calculator',
    property: '/massachusetts-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'michigan',
    name: 'Michigan',
    income: '/michigan-tax-calculator',
    property: '/michigan-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'minnesota',
    name: 'Minnesota',
    income: '/minnesota-tax-calculator',
    property: '/minnesota-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'mississippi',
    name: 'Mississippi',
    income: '/mississippi-tax-calculator',
    property: null,
    payroll: '/mississippi-paycheck-calculator'
  },
  {
    slug: 'missouri',
    name: 'Missouri',
    income: '/missouri-tax-calculator',
    property: null,
    payroll: null
  },
  {
    slug: 'nebraska',
    name: 'Nebraska',
    income: '/nebraska-tax-calculator',
    property: null,
    payroll: '/nebraska-paycheck-calculator'
  },
    {
    slug: 'new-jersey',
    name: 'New Jersey',
    income: '/new-jersey-tax-calculator',
    property: '/new-jersey-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'new-mexico',
    name: 'New Mexico',
    income: '/new-mexico-tax-calculator',
    property: null,
    payroll: '/new-mexico-paycheck-calculator'
  },
  {
    slug: 'new-york',
    name: 'New York',
    income: '/new-york-tax-calculator',
    property: '/new-york-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'north-carolina',
    name: 'North Carolina',
    income: '/north-carolina-tax-calculator',
    property: '/north-carolina-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'ohio',
    name: 'Ohio',
    income: '/ohio-tax-calculator',
    property: '/ohio-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'oklahoma',
    name: 'Oklahoma',
    income: '/oklahoma-tax-calculator',
    property: null,
    payroll: '/oklahoma-paycheck-calculator'
  },
    {
    slug: 'pennsylvania',
    name: 'Pennsylvania',
    income: '/pennsylvania-tax-calculator',
    property: '/pennsylvania-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'south-carolina',
    name: 'South Carolina',
    income: '/south-carolina-tax-calculator',
    property: null,
    payroll: null
  },
  {
    slug: 'tennessee',
    name: 'Tennessee',
    income: '/tennessee-tax-calculator',
    property: '/tennessee-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'texas',
    name: 'Texas',
    income: '/texas-tax-calculator',
    property: null,
    payroll: null
  },
    {
    slug: 'virginia',
    name: 'Virginia',
    income: '/virginia-tax-calculator',
    property: '/virginia-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'washington',
    name: 'Washington',
    income: '/washington-tax-calculator',
    property: '/washington-property-tax-calculator',
    payroll: null
  },
  {
    slug: 'wisconsin',
    name: 'Wisconsin',
    income: '/wisconsin-tax-calculator',
    property: '/wisconsin-property-tax-calculator',
    payroll: null
  },
];
