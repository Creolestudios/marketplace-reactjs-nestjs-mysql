export enum UserWorkAs {
  BUSINESS = 0,
  FREELANCE = 1,
}

export enum PreferredWayOfContacting {
  PHONE = 0,
  EMAIL = 1,
}

export enum MediaType {
  video = 'video',
  image = 'image',
}

export enum CreateTaskDateAndTime {
  GET_STARTED = 0,
  TO_FINISH_WORK = 1,
  SPECIFY_PERIOD = 2,
}

export enum SpecialistPreference {
  BUSINESS = 0,
  FREELANCE = 1,
  BOTH = 2,
}

export enum BID_STATUS {
  OPEN = 0,
  ACTIVE = 1,
  REJECTED = 2,
  CLOSED = 3,
}

export enum USER_TYPE {
  EMPLOYER = 'employer',
  SPECIALIST = 'specialist',
}

export enum ACCEPT_REJECT {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
}

export enum TASK_CREATE_UPDATE_REPOST {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  REPOST = 'REPOST',
}

export enum TASK_CANCELLATION_BY {
  EMPLOYER = 0,
  SPECIALIST = 1,
  ADMIN = 2,
}

export enum TASK_CANCELLATION_DISGREE_BY {
  EMPLOYER = 0,
  SPECIALIST = 1,
  ADMIN = 2,
}

export enum USER_ROLE {
  USER = 0,
  ADMIN = 1,
}

export enum ACCOUNT_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
  SUSPEND = 3,
}

export enum TASK_DATE_AND_TIME {
  GET_STARTED = 'GET_STARTED',
  TO_FINISH_WORK = 'TO_FINISH_WORK',
  SPECIFY_PERIOD = 'SPECIFY_PERIOD',
}

export enum TASK_TYPE {
  GET_STARTED = 0,
  TO_FINISH_WORK = 1,
  SPECIFY_PERIOD = 2,
}

export enum TASK_STATUS {
  OPEN = 1,
  ACTIVE = 2,
  ARCHIVED = 3,
  COMPLETED = 4,
  CANCELLATION_REQUEST_BY_EMPLOYER = 5,
  CANCELLATION_REQUEST_BY_SPECIALIST = 6,
  CANCELLED = 7,
  REPORTED = 8,
}

export enum REPORTED_TASK_STATUS {
  OPEN = 0,
  RESOLVED = 1,
}

export enum REPORTED_BY {
  EMPLOYER = 0,
  SPECIALIST = 1,
}

export enum USER_TYPE_NUMBER {
  EMPLOYER = 0,
  SPECIALIST = 1,
}

export enum CHARGE_STATUS {
  failed = 0,
  succeeded = 1,
}

export enum STRIPE_STANDARD_ACCOUNT_LINK {
  onboarding = 'account_onboarding',
  verify = 'custom_account_verification',
  update = 'custom_account_update',
}

export enum STRIPE_ACCOUNT_TYPE {
  STANDARD = 'standard',
}

export enum STRIPE_ACCOUNT_BUSINESS_TYPE {
  INDIVIDUAL = 'individual',
}

export enum STRIPE_EXTERNAL_OBJECT {
  bank = 'bank_account',
}

export enum STRIPE_CURRENCY {
  DKK = 'dkk',
}

export enum STRIPE_COUNTRY {
  DK = 'DK',
}

export enum STRIPE_MINIMUM_CHARGE { // In KR
  AMOUNT = 2.5,
}

export enum TRANSACTION_ORDER_BY {
  transaction_id = 'transaction_id',
  task_id = 'task_id',
  sender = 'sender',
  recipient = 'recipient',
  amount = 'amount',
  date = 'date',
  outstanding_amount = 'outstanding_amount',
}

export enum USER_ORDER_BY {
  user_id = 'user_id',
  user_name = 'user_name',
  user_email = 'user_email',
  type_of_services = 'type_of_services',
  last_active = 'last_active',
  report_count = 'report_count',
}

export enum TASKS_ORDER_BY {
  task_id = 'task_id',
  category = 'category',
  sub_category = 'sub_category',
  task_title = 'task_title',
  employer = 'employer',
  specialist = 'specialist',
  reporter = 'reporter',
  accused = 'accused',
  status = 'status',
  date = 'date',
}

export enum ATTRIBUTES_ORDER_BY {
  category_id = 'category_id',
  category_name = 'category_name',
  sub_categories = 'sub_categories',
}

export enum ATTRIBUTES_CATEGORY_ORDER_BY {
  sub_category_id = 'sub_category_id',
  sub_category_name = 'sub_category_name',
}

export enum ORDER_BY_TYPE {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum TRANSACTION_STATUS {
  FAILURE = 0,
  SUCCESS = 1,
}

export enum TRANSACTION_TYPE {
  TASK_PAYMENT = 0,
  TASK_COMPLETION_PAYMENT = 1,
  CANCELLED_TASK_PAYMENT = 2,
  REPORTED_TASK_PAYMENT = 3,
  SUSPENDED_SPECIALIST_PAYMENT = 4,
}

export enum NOTIFICATION_STATUS {
  UNREAD = 0,
  READ = 1,
}

export enum REPORT_PROFILE_STATUS {
  PENDING = 0,
  REVIEWED = 1,
}

export enum PAYMENT_TYPE {
  NEUTRAL = 0,
  CREDIT = 1,
  DEBIT = 2,
}

export enum TRANSACTION_USER_ORDER_BY {
  transaction_id = 'transaction_id',
  amount = 'amount',
  date = 'date',
}

export enum CHAT_BY_TYPE {
  EMPLOYER = 0,
  SPECIALIST = 1,
  BOTH = 2,
}

export enum CHAT_ROOM_STATUS {
  ACTIVE = 1,
  TRASH = 2,
  ARCHIVED = 3,
}

export enum CHAT_READ_STATUS {
  UNREAD = 0,
  READ = 1,
}

export enum NOTIFICATION_USER {
  ADMIN = 0,
  EMPLOYER = 1,
  SPECIALIST = 2,
  USER = 3,
}

export enum NOTIFICATION_TYPE {
  SUSPENDED_USER = 10,
}

export enum LANGUAGE {
  EN = 'en',
  DE = 'de',
}
