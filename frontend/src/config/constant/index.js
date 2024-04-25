import { ReactComponent as Icon1 } from "@iso/assets/images/custom-links/icon-1.svg";
import { ReactComponent as Icon2 } from "@iso/assets/images/custom-links/icon-2.svg";
import { ReactComponent as Icon3 } from "@iso/assets/images/custom-links/icon-3.svg";
import { ReactComponent as Icon4 } from "@iso/assets/images/custom-links/icon-4.svg";
import { ReactComponent as Icon5 } from "@iso/assets/images/custom-links/icon-5.svg";
import { ReactComponent as Icon6 } from "@iso/assets/images/custom-links/icon-6.svg";
import { ReactComponent as Icon7 } from "@iso/assets/images/custom-links/icon-7.svg";
import { ReactComponent as Icon8 } from "@iso/assets/images/custom-links/icon-8.svg";
import { ReactComponent as Icon9 } from "@iso/assets/images/custom-links/icon-9.svg";
import { ReactComponent as Icon10 } from "@iso/assets/images/custom-links/icon-10.svg";
import { ReactComponent as Icon11 } from "@iso/assets/images/custom-links/icon-11.svg";
import { ReactComponent as Icon12 } from "@iso/assets/images/custom-links/icon-12.svg";
import { ReactComponent as Icon13 } from "@iso/assets/images/custom-links/icon-13.svg";
import { ReactComponent as Icon14 } from "@iso/assets/images/custom-links/icon-14.svg";
import { ReactComponent as Icon15 } from "@iso/assets/images/custom-links/icon-15.svg";
import IntlMessages from "@iso/components/utility/intlMessages";

export const getWhiteIcons = (name) =>
  name
    ? `http://${
        process.env.NODE_ENV !== "production"
          ? "localhost:5000"
          : "139.59.65.130:5000"
      }/upload/menu_icons/white/${name}.png`
    : null;

export const getGrayIcons = (name) =>
  name
    ? `http://${
        process.env.NODE_ENV !== "production"
          ? "localhost:5000"
          : "139.59.65.130:5000"
      }/upload/menu_icons/gray/${name}.png`
    : null;

export const getGreenIcons = (name) =>
  name
    ? `http://${
        process.env.NODE_ENV !== "production"
          ? "localhost:5000"
          : "139.59.65.130:5000"
      }/upload/menu_icons/green/${name}.png`
    : null;

export const AppConstant = {
  unique_id: "assaddsasdakdsasdalsdklsdaksda320832409843902",
  formLabel: {
    Email: "Email",
  },
  Role: {
    LO: "LO",
    ADMIN: "ADMIN",
  },
  Placeholder: {
    enterHere: "Enter Here",
    email: "abc@xyz.com",
  },
  FormValidation: {
    address: <IntlMessages id="ant.address.validation" />,
    passwordMatch: <IntlMessages id="ant.passwordMatch.validation" />,
    emailRequired: <IntlMessages id="ant.emailRequired.validation" />,
    ageInvalid: <IntlMessages id="ant.ageInvalid.validation" />,
    emailInvalid: <IntlMessages id="ant.emailInvalid.validation" />,
    passwordRequired: <IntlMessages id="ant.passwordRequired.validation" />,
    passwordLength: <IntlMessages id="ant.passwordLength.validation" />,
    passwordValid: <IntlMessages id="ant.passwordValid.validation" />,
    phoneRequired: <IntlMessages id="ant.phoneRequired.validation" />,
    phoneValid: <IntlMessages id="ant.phoneValid.validation" />,
    bioValid: <IntlMessages id="ant.bioValid.validation" />,
    nameValid: <IntlMessages id="ant.nameValid.validation" />,
    nameRequired: <IntlMessages id="ant.nameRequired.validation" />,
    titleValid: <IntlMessages id="ant.titleValid.validation" />,
    firstnameRequired: <IntlMessages id="ant.firstnameRequired.validation" />,
    lastnameRequired: <IntlMessages id="ant.lastnameRequired.validation" />,
    companyRequired: <IntlMessages id="ant.companyRequired.validation" />,
    titleRequired: <IntlMessages id="ant.title.validation" />,
    licenceRequired: <IntlMessages id="ant.licenceRequired.validation" />,
    numberRequired: <IntlMessages id="ant.numberRequired.validation" />,
    cityRequired: <IntlMessages id="ant.cityRequired.validation" />,
    zipcodeRequired: <IntlMessages id="ant.zipcode.validation" />,
    postalcodeRequired: <IntlMessages id="ant.postalcodeRequired.validation" />,
    addressRequired: <IntlMessages id="ant.addressRequired.validation" />,
    addressLine1Required: (
      <IntlMessages id="ant.addressLine1Required.validation" />
    ),
    addressLine2Required: (
      <IntlMessages id="ant.addressLine2Required.validation" />
    ),
    DKBankAccountNumberRequired: (
      <IntlMessages id="ant.DKBankAccountNumberRequired.validation" />
    ),
    stateSelectRequired: (
      <IntlMessages id="ant.stateSelectRequired.validation" />
    ),
    urlInvalid: <IntlMessages id="ant.urlInvalid.validation" />,
    minNumberLength: <IntlMessages id="ant.minNumberLength.validation" />,
    maxNumberLength: <IntlMessages id="ant.maxNumberLength.validation" />,
    numberOnly: <IntlMessages id="ant.numberOnly.validation" />,
    cityValid: <IntlMessages id="ant.cityValid.validation" />,
    confirmPassword: <IntlMessages id="ant.confirmPassword.validation" />,
    terms_condition: <IntlMessages id="ant.terms_condition.validation" />,
    numbers_not_allowed: (
      <IntlMessages id="ant.numbers_not_allowed.validation" />
    ),
    checklistnameRequired: (
      <IntlMessages id="ant.checklistnameRequired.validation" />
    ),
    itemsRequired: <IntlMessages id="ant.itemsRequired.validation" />,
    description: <IntlMessages id="ant.discription.validation" />,
    category: <IntlMessages id="ant.category.validation" />,
    subCategory: <IntlMessages id="ant.subcat.validation" />,
    date: <IntlMessages id="ant.date.validation" />,
    budget: <IntlMessages id="ant.budget.validation" />,
    budgetRange: <IntlMessages id="ant.budgetRange.validation" />,

    budgetGreaterZeroRange: (
      <IntlMessages id="antd.budgetGreaterZeroRange.validation" />
    ),
    reviewRequired: <IntlMessages id="antd.reviewRequired.validation" />,
    ratingRequired: <IntlMessages id="antd.ratingRequired.validation" />,
    start_time: <IntlMessages id="ant.start_time.validation" />,
    end_time: <IntlMessages id="ant.end_time.validation" />,
    zipcodeValidation: <IntlMessages id="ant.zipcodeValidation.validation" />,
    nameOnCard: <IntlMessages id="ant.cardName.validation" />,
    cardNumber: <IntlMessages id="ant.cardNumber.validation" />,
    selectExpiryMonth: <IntlMessages id="ant.month.validation" />,
    selectExpiryYear: <IntlMessages id="ant.year.validation" />,
    cvvRequired: <IntlMessages id="ant.code.validation" />,
    cvvValid: <IntlMessages id="ant.cvvValid.validation" />,
    categoryRequired: <IntlMessages id="ant.categoryRequired.validation" />,
    subCategoryRequired: <IntlMessages id="ant.subCategoryRequired.validation" />,
    refundEmployer: <IntlMessages id="ant.refundEmployer.validation" />,
    refundSpecialist: <IntlMessages id="ant.refundSpecialist.validation" />,
    message: <IntlMessages id="ant.message.validation" />,

  },
  stateList: [
    { id: 1, name: "Florida" },
    { id: 2, name: "Kentucky" },
    { id: 3, name: "New York" },
    { id: 4, name: "South Carolina" },
  ],
  DefaultMenus: [
    {
      id: "DASHBOARD",
      name: "Dashboard",
      sequence: 1,
      type: 1,
      icon: {
        white: getWhiteIcons("DASHBOARD".toLowerCase()),
        gray: getGrayIcons("DASHBOARD".toLowerCase()),
        green: getGreenIcons("DASHBOARD".toLowerCase()),
      },
    },
    {
      id: "CALCULATOR",
      type: 1,
      name: "Calculator",
      sequence: 2,
      icon: {
        white: getWhiteIcons("CALCULATOR".toLowerCase()),
        gray: getGrayIcons("CALCULATOR".toLowerCase()),
        green: getGreenIcons("CALCULATOR".toLowerCase()),
      },
    },
    {
      id: "SCAN",
      type: 1,
      name: "Scan",
      sequence: 3,
      icon: {
        white: getWhiteIcons("SCAN".toLowerCase()),
        gray: getGrayIcons("SCAN".toLowerCase()),
        green: getGreenIcons("SCAN".toLowerCase()),
      },
    },
    {
      id: "GUIDE",
      type: 1,
      name: "Guide",
      sequence: 4,
      icon: {
        white: getWhiteIcons("GUIDE".toLowerCase()),
        gray: getGrayIcons("GUIDE".toLowerCase()),
        green: getGreenIcons("GUIDE".toLowerCase()),
      },
    },
    {
      id: "UPLOADED_DOCUMENTS",
      type: 1,
      name: "Uploaded Documents",
      sequence: 5,
      icon: {
        white: getWhiteIcons("UPLOADED_DOCUMENTS".toLowerCase()),
        gray: getGrayIcons("UPLOADED_DOCUMENTS".toLowerCase()),
        green: getGreenIcons("UPLOADED_DOCUMENTS".toLowerCase()),
      },
    },
    {
      id: "MESSAGE",
      type: 1,
      name: "Message",
      sequence: 6,
      icon: {
        white: getWhiteIcons("MESSAGE".toLowerCase()),
        gray: getGrayIcons("MESSAGE".toLowerCase()),
        green: getGreenIcons("MESSAGE".toLowerCase()),
      },
    },
    {
      id: "NOTIFICATIONS",
      type: 1,
      name: "Notifications",
      sequence: 7,
      icon: {
        white: getWhiteIcons("NOTIFICATIONS".toLowerCase()),
        gray: getGrayIcons("NOTIFICATIONS".toLowerCase()),
        green: getGreenIcons("NOTIFICATIONS".toLowerCase()),
      },
    },
    {
      id: "SAVED_CALCULATIONS",
      type: 1,
      name: "Saved Calculations",
      sequence: 8,
      icon: {
        white: getWhiteIcons("SAVED_CALCULATIONS".toLowerCase()),
        gray: getGrayIcons("SAVED_CALCULATIONS".toLowerCase()),
        green: getGreenIcons("SAVED_CALCULATIONS".toLowerCase()),
      },
    },
    {
      id: "CHECKLISTS",
      type: 1,
      name: "Checklist",
      sequence: 9,
      icon: {
        white: getWhiteIcons("CHECKLISTS".toLowerCase()),
        gray: getGrayIcons("CHECKLISTS".toLowerCase()),
        green: getGreenIcons("CHECKLISTS".toLowerCase()),
      },
    },
    {
      id: "CALLBACK_REQUEST",
      type: 1,
      name: "Callback Request",
      sequence: 10,
      icon: {
        white: getWhiteIcons("CALLBACK_REQUEST".toLowerCase()),
        gray: getGrayIcons("CALLBACK_REQUEST".toLowerCase()),
        green: getGreenIcons("CALLBACK_REQUEST".toLowerCase()),
      },
    },
  ],
  CardStatus: {
    Open: 1,
    Active: 2,
    Archieved: 3,
    Completed: 4,
    cancellation_requested_by_employer: 5,
    cancellation_requested_by_specialist: 6,
    cancelled: 7,
    Reported: 8,
  },
  key: {
    Zero: 0,
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
  },
};

export const imageArr = [
  { id: 1, value: Icon1, name: "uploaded_documents" },
  { id: 2, value: Icon2, name: "message" },
  { id: 3, value: Icon3, name: "checklists" },
  { id: 4, value: Icon4, name: "callback_request" },
  { id: 5, value: Icon5, name: "notifications" },
  { id: 6, value: Icon6, name: "saved_calculations" },
  { id: 7, value: Icon7, name: "dashboard" },
  { id: 8, value: Icon8, name: "calculator" },
  { id: 9, value: Icon9, name: "scan" },
  { id: 10, value: Icon10, name: "guide" },
  { id: 11, value: Icon11, name: "bookmark" },
  { id: 12, value: Icon12, name: "single-user" },
  { id: 13, value: Icon13, name: "note" },
  { id: 14, value: Icon14, name: "graph" },
  { id: 15, value: Icon15, name: "camera" },
];

export const imageObj = {
  uploaded_documents: Icon1,
  message: Icon2,
  checklists: Icon3,
  callback_request: Icon4,
  notifications: Icon5,
  saved_calculations: Icon6,
  dashboard: Icon7,
  calculator: Icon8,
  scan: Icon9,
  guide: Icon10,
  bookmark: Icon11,
  "single-user": Icon12,
  note: Icon13,
  graph: Icon14,
  camera: Icon15,
};

export const Months = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
export const years = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
  String(currentYear + i)
);


export const PasswordStrengthRegex =
   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
export const PhoneNumberRegex = /^[0-9]{8,14}$/;
export const CvvNumberRegex = /^[0-9]{3,4}$/;
export const PhoneNumberMaskRegex =
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
export const PhoneNumberUnMaskRegex = /[\(\)\s\-'"]/g;
export const NameRegex = /^[A-zÀ-ú\s]*$/;
export const HTMLEmpty = /(((<\w+>)+[ \n(<br>)]*(<\/\w+>)+)+)|<br>/g;
// export const BudgetNumber = /^[1-9][0-9]?[0-9]?[0-9]?$|^5000$/;
export const BudgetNumber = /^([5-9]\d*(\.\d{1,2})?|\d{3,}(\.\d{1,2})?)$/;
export const BudgetGreaterZero =
  /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;
export const zipCodeRegex = /^-?\d*(\.\d*)?$/;
export const BioRegex = /^((?!(http|https|www|[0-9]{10}|\.[a-zA-Z])).)*$/;
export const countryCodes = [
	{'name': 'ANDORRA','code': '376'} ,
	{'name': 'UNITED ARAB EMIRATES','code': '971'} ,
	{'name': 'AFGHANISTAN','code': '93'} ,
	{'name': 'ANTIGUA AND BARBUDA','code': '1268'} ,
	{'name': 'ANGUILLA','code': '1264'} ,
	{'name': 'ALBANIA','code': '355'} ,
	{'name': 'ARMENIA','code': '374'} ,
	{'name': 'NETHERLANDS ANTILLES','code': '599'} ,
	{'name': 'ANGOLA','code': '244'} ,
	{'name': 'ANTARCTICA','code': '672'} ,
	{'name': 'ARGENTINA','code': '54'} ,
	{'name': 'AMERICAN SAMOA','code': '1684'} ,
	{'name': 'AUSTRIA','code': '43'} ,
	{'name': 'AUSTRALIA','code': '61'} ,
	{'name': 'ARUBA','code': '297'} ,
	{'name': 'AZERBAIJAN','code': '994'} ,
	{'name': 'BOSNIA AND HERZEGOVINA','code': '387'} ,
	{'name': 'BARBADOS','code': '1246'} ,
	{'name': 'BANGLADESH','code': '880'} ,
	{'name': 'BELGIUM','code': '32'} ,
	{'name': 'BURKINA FASO','code': '226'} ,
	{'name': 'BULGARIA','code': '359'} ,
	{'name': 'BAHRAIN','code': '973'} ,
	{'name': 'BURUNDI','code': '257'} ,
	{'name': 'BENIN','code': '229'} ,
	{'name': 'SAINT BARTHELEMY','code': '590'} ,
	{'name': 'BERMUDA','code': '1441'} ,
	{'name': 'BRUNEI DARUSSALAM','code': '673'} ,
	{'name': 'BOLIVIA','code': '591'} ,
	{'name': 'BRAZIL','code': '55'} ,
	{'name': 'BAHAMAS','code': '1242'} ,
	{'name': 'BHUTAN','code': '975'} ,
	{'name': 'BOTSWANA','code': '267'} ,
	{'name': 'BELARUS','code': '375'} ,
	{'name': 'BELIZE','code': '501'} ,
	{'name': 'CANADA','code': '1'} ,
	{'name': 'COCOS (KEELING) ISLANDS','code': '61'} ,
	{'name': 'CONGO, THE DEMOCRATIC REPUBLIC OF THE','code': '243'} ,
	{'name': 'CENTRAL AFRICAN REPUBLIC','code': '236'} ,
	{'name': 'CONGO','code': '242'} ,
	{'name': 'SWITZERLAND','code': '41'} ,
	{'name': 'COTE D IVOIRE','code': '225'} ,
	{'name': 'COOK ISLANDS','code': '682'} ,
	{'name': 'CHILE','code': '56'} ,
	{'name': 'CAMEROON','code': '237'} ,
	{'name': 'CHINA','code': '86'} ,
	{'name': 'COLOMBIA','code': '57'} ,
	{'name': 'COSTA RICA','code': '506'} ,
	{'name': 'CUBA','code': '53'} ,
	{'name': 'CAPE VERDE','code': '238'} ,
	{'name': 'CHRISTMAS ISLAND','code': '61'} ,
	{'name': 'CYPRUS','code': '357'} ,
	{'name': 'CZECH REPUBLIC','code': '420'} ,
	{'name': 'GERMANY','code': '49'} ,
	{'name': 'DJIBOUTI','code': '253'} ,
	{'name': 'DENMARK','code': '45'} ,
	{'name': 'DOMINICA','code': '1767'} ,
	{'name': 'DOMINICAN REPUBLIC','code': '1809'} ,
	{'name': 'ALGERIA','code': '213'} ,
	{'name': 'ECUADOR','code': '593'} ,
	{'name': 'ESTONIA','code': '372'} ,
	{'name': 'EGYPT','code': '20'} ,
	{'name': 'ERITREA','code': '291'} ,
	{'name': 'SPAIN','code': '34'} ,
	{'name': 'ETHIOPIA','code': '251'} ,
	{'name': 'FINLAND','code': '358'} ,
	{'name': 'FIJI','code': '679'} ,
	{'name': 'FALKLAND ISLANDS (MALVINAS)','code': '500'} ,
	{'name': 'MICRONESIA, FEDERATED STATES OF','code': '691'} ,
	{'name': 'FAROE ISLANDS','code': '298'} ,
	{'name': 'FRANCE','code': '33'} ,
	{'name': 'GABON','code': '241'} ,
	{'name': 'UNITED KINGDOM','code': '44'} ,
	{'name': 'GRENADA','code': '1473'} ,
	{'name': 'GEORGIA','code': '995'} ,
	{'name': 'GHANA','code': '233'} ,
	{'name': 'GIBRALTAR','code': '350'} ,
	{'name': 'GREENLAND','code': '299'} ,
	{'name': 'GAMBIA','code': '220'} ,
	{'name': 'GUINEA','code': '224'} ,
	{'name': 'EQUATORIAL GUINEA','code': '240'} ,
	{'name': 'GREECE','code': '30'} ,
	{'name': 'GUATEMALA','code': '502'} ,
	{'name': 'GUAM','code': '1671'} ,
	{'name': 'GUINEA-BISSAU','code': '245'} ,
	{'name': 'GUYANA','code': '592'} ,
	{'name': 'HONG KONG','code': '852'} ,
	{'name': 'HONDURAS','code': '504'} ,
	{'name': 'CROATIA','code': '385'} ,
	{'name': 'HAITI','code': '509'} ,
	{'name': 'HUNGARY','code': '36'} ,
	{'name': 'INDONESIA','code': '62'} ,
	{'name': 'IRELAND','code': '353'} ,
	{'name': 'ISRAEL','code': '972'} ,
	{'name': 'ISLE OF MAN','code': '44'} ,
	{'name': 'INDIA','code': '91'} ,
	{'name': 'IRAQ','code': '964'} ,
	{'name': 'IRAN, ISLAMIC REPUBLIC OF','code': '98'} ,
	{'name': 'ICELAND','code': '354'} ,
	{'name': 'ITALY','code': '39'} ,
	{'name': 'JAMAICA','code': '1876'} ,
	{'name': 'JORDAN','code': '962'} ,
	{'name': 'JAPAN','code': '81'} ,
	{'name': 'KENYA','code': '254'} ,
	{'name': 'KYRGYZSTAN','code': '996'} ,
	{'name': 'CAMBODIA','code': '855'} ,
	{'name': 'KIRIBATI','code': '686'} ,
	{'name': 'COMOROS','code': '269'} ,
	{'name': 'SAINT KITTS AND NEVIS','code': '1869'} ,
	{'name': 'KOREA DEMOCRATIC PEOPLES REPUBLIC OF','code': '850'} ,
	{'name': 'KOREA REPUBLIC OF','code': '82'} ,
	{'name': 'KUWAIT','code': '965'} ,
	{'name': 'CAYMAN ISLANDS','code': '1345'} ,
	{'name': 'KAZAKSTAN','code': '7'} ,
	{'name': 'LAO PEOPLES DEMOCRATIC REPUBLIC','code': '856'} ,
	{'name': 'LEBANON','code': '961'} ,
	{'name': 'SAINT LUCIA','code': '1758'} ,
	{'name': 'LIECHTENSTEIN','code': '423'} ,
	{'name': 'SRI LANKA','code': '94'} ,
	{'name': 'LIBERIA','code': '231'} ,
	{'name': 'LESOTHO','code': '266'} ,
	{'name': 'LITHUANIA','code': '370'} ,
	{'name': 'LUXEMBOURG','code': '352'} ,
	{'name': 'LATVIA','code': '371'} ,
	{'name': 'LIBYAN ARAB JAMAHIRIYA','code': '218'} ,
	{'name': 'MOROCCO','code': '212'} ,
	{'name': 'MONACO','code': '377'} ,
	{'name': 'MOLDOVA, REPUBLIC OF','code': '373'} ,
	{'name': 'MONTENEGRO','code': '382'} ,
	{'name': 'SAINT MARTIN','code': '1599'} ,
	{'name': 'MADAGASCAR','code': '261'} ,
	{'name': 'MARSHALL ISLANDS','code': '692'} ,
	{'name': 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF','code': '389'} ,
	{'name': 'MALI','code': '223'} ,
	{'name': 'MYANMAR','code': '95'} ,
	{'name': 'MONGOLIA','code': '976'} ,
	{'name': 'MACAU','code': '853'} ,
	{'name': 'NORTHERN MARIANA ISLANDS','code': '1670'} ,
	{'name': 'MAURITANIA','code': '222'} ,
	{'name': 'MONTSERRAT','code': '1664'} ,
	{'name': 'MALTA','code': '356'} ,
	{'name': 'MAURITIUS','code': '230'} ,
	{'name': 'MALDIVES','code': '960'} ,
	{'name': 'MALAWI','code': '265'} ,
	{'name': 'MEXICO','code': '52'} ,
	{'name': 'MALAYSIA','code': '60'} ,
	{'name': 'MOZAMBIQUE','code': '258'} ,
	{'name': 'NAMIBIA','code': '264'} ,
	{'name': 'NEW CALEDONIA','code': '687'} ,
	{'name': 'NIGER','code': '227'} ,
	{'name': 'NIGERIA','code': '234'} ,
	{'name': 'NICARAGUA','code': '505'} ,
	{'name': 'NETHERLANDS','code': '31'} ,
	{'name': 'NORWAY','code': '47'} ,
	{'name': 'NEPAL','code': '977'} ,
	{'name': 'NAURU','code': '674'} ,
	{'name': 'NIUE','code': '683'} ,
	{'name': 'NEW ZEALAND','code': '64'} ,
	{'name': 'OMAN','code': '968'} ,
	{'name': 'PANAMA','code': '507'} ,
	{'name': 'PERU','code': '51'} ,
	{'name': 'FRENCH POLYNESIA','code': '689'} ,
	{'name': 'PAPUA NEW GUINEA','code': '675'} ,
	{'name': 'PHILIPPINES','code': '63'} ,
	{'name': 'PAKISTAN','code': '92'} ,
	{'name': 'POLAND','code': '48'} ,
	{'name': 'SAINT PIERRE AND MIQUELON','code': '508'} ,
	{'name': 'PITCAIRN','code': '870'} ,
	{'name': 'PUERTO RICO','code': '1'} ,
	{'name': 'PORTUGAL','code': '351'} ,
	{'name': 'PALAU','code': '680'} ,
	{'name': 'PARAGUAY','code': '595'} ,
	{'name': 'QATAR','code': '974'} ,
	{'name': 'ROMANIA','code': '40'} ,
	{'name': 'SERBIA','code': '381'} ,
	{'name': 'RUSSIAN FEDERATION','code': '7'} ,
	{'name': 'RWANDA','code': '250'} ,
	{'name': 'SAUDI ARABIA','code': '966'} ,
	{'name': 'SOLOMON ISLANDS','code': '677'} ,
	{'name': 'SEYCHELLES','code': '248'} ,
	{'name': 'SUDAN','code': '249'} ,
	{'name': 'SWEDEN','code': '46'} ,
	{'name': 'SINGAPORE','code': '65'} ,
	{'name': 'SAINT HELENA','code': '290'} ,
	{'name': 'SLOVENIA','code': '386'} ,
	{'name': 'SLOVAKIA','code': '421'} ,
	{'name': 'SIERRA LEONE','code': '232'} ,
	{'name': 'SAN MARINO','code': '378'} ,
	{'name': 'SENEGAL','code': '221'} ,
	{'name': 'SOMALIA','code': '252'} ,
	{'name': 'SURINAME','code': '597'} ,
	{'name': 'SAO TOME AND PRINCIPE','code': '239'} ,
	{'name': 'EL SALVADOR','code': '503'} ,
	{'name': 'SYRIAN ARAB REPUBLIC','code': '963'} ,
	{'name': 'SWAZILAND','code': '268'} ,
	{'name': 'TURKS AND CAICOS ISLANDS','code': '1649'} ,
	{'name': 'CHAD','code': '235'} ,
	{'name': 'TOGO','code': '228'} ,
	{'name': 'THAILAND','code': '66'} ,
	{'name': 'TAJIKISTAN','code': '992'} ,
	{'name': 'TOKELAU','code': '690'} ,
	{'name': 'TIMOR-LESTE','code': '670'} ,
	{'name': 'TURKMENISTAN','code': '993'} ,
	{'name': 'TUNISIA','code': '216'} ,
	{'name': 'TONGA','code': '676'} ,
	{'name': 'TURKEY','code': '90'} ,
	{'name': 'TRINIDAD AND TOBAGO','code': '1868'} ,
	{'name': 'TUVALU','code': '688'} ,
	{'name': 'TAIWAN, PROVINCE OF CHINA','code': '886'} ,
	{'name': 'TANZANIA, UNITED REPUBLIC OF','code': '255'} ,
	{'name': 'UKRAINE','code': '380'} ,
	{'name': 'UGANDA','code': '256'} ,
	{'name': 'UNITED STATES','code': '1'} ,
	{'name': 'URUGUAY','code': '598'} ,
	{'name': 'UZBEKISTAN','code': '998'} ,
	{'name': 'HOLY SEE (VATICAN CITY STATE)','code': '39'} ,
	{'name': 'SAINT VINCENT AND THE GRENADINES','code': '1784'} ,
	{'name': 'VENEZUELA','code': '58'} ,
	{'name': 'VIRGIN ISLANDS, BRITISH','code': '1284'} ,
	{'name': 'VIRGIN ISLANDS, U.S.','code': '1340'} ,
	{'name': 'VIET NAM','code': '84'} ,
	{'name': 'VANUATU','code': '678'} ,
	{'name': 'WALLIS AND FUTUNA','code': '681'} ,
	{'name': 'SAMOA','code': '685'} ,
	{'name': 'KOSOVO','code': '381'} ,
	{'name': 'YEMEN','code': '967'} ,
	{'name': 'MAYOTTE','code': '262'} ,
	{'name': 'SOUTH AFRICA','code': '27'} ,
	{'name': 'ZAMBIA','code': '260'} ,
	{'name': 'ZIMBABWE','code': '263'} ,
];