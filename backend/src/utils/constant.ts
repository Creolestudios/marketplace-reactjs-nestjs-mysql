import {
  ATTRIBUTES_CATEGORY_ORDER_BY,
  ATTRIBUTES_ORDER_BY,
  ORDER_BY_TYPE,
  TASKS_ORDER_BY,
  TRANSACTION_ORDER_BY,
  TRANSACTION_USER_ORDER_BY,
  USER_ORDER_BY,
} from './enums';

export const ErrorMessage = {
  invalid_role: 'Invalid Role !',
  invalid_user: 'Invalid User !',
  blank_email: 'Please provide email address',
  blank_password: 'Please provide Password',
  invalid_email: 'Please provide valid email address',
  invalid_password: 'Please provide valid Password',
  invalid_code: 'Code does not match. Please check again!',
  invalid_code_number: 'Code must be a number, Please check again!',
  invalid_age: 'User must be at least 13 years old',
  password_does_not_match: 'Passwords does not match. Please check again!',
  email_exist: 'Given email already exists !',
  user_not_exist: 'No user exists for the given details!',
  refresh_token_expired: 'Refresh token is expired',
  account_already_verified: 'Account is already verified',
  no_verification_code_available: 'No Verification code available try again',
  try_again_latter: 'Please do try again later',
  user_already_verified: 'User is already verified !',
  code_expired_check_new_code: 'Code is expired, please enter the new code.',
  code_already_verified: 'Code already verified.',
  start_date_and_time_validation: 'Please provide start date and time',
  end_date_and_time_validation: 'Please provide start date and time',
  specific_period_validation:
    'Please provide start date time and end date time',
  invalid_phone_object:
    'Please provide valid phone object, it must be an array of an object must contain two elements { phone_number: number, phone_type: string }',
  invalid_budget_object:
    'Please provide valid task budget object, it must be an array of an object must contain two elements { start_value: number, end_value: number }, having start_value <= end_value',
  invalid_service_object:
    'Please provide valid service object, it must be an array of an object must contain following elements { existing_service: [0,1] , service_id: number, service_name: string, estimate_price: number }',
  invalid_add_type_service_object:
    'Please provide valid service object, it must be an array of an object must contain following elements { category: number , sub_category: number, service_name: string, estimate_price: number }',
  profile_completion_error: 'Please complete your profile first',
  user_unauthorized: 'Unauthorized',
  invalid_file_object:
    'Please provide valid file object, it must be an array of an object must contain two elements { fileName: string, fileMime: string, fileBuffer: object }',
  minimum_amount_50: 'Minimum amount should be 50',
};

export const DtoErrorMessage = {
  full_name: 'Full name should not be greater than 50 character',
  work_as: "work as type must be either 'BUSINESS' or 'FREELANCE'",
  password:
    'Password must contain at least one capital letter, also numbers and should be atleast 6 characters long.',
  confirm_password:
    'Confirm Password must contain at least one capital letter, also numbers and should be atleast 6 characters long.',
  new_password:
    'Password must contain at least one capital letter, also numbers and should be atleast 6 characters long.',
  new_confirm_password:
    'Confirm Password must contain at least one capital letter, also numbers and should be atleast 6 characters long.',
  date_format: 'must be formatted as YYYY-MM-DD',
  max_date: 'maximum value must be current date',
  category_number: 'Category ID should must be a number',
  sub_category_number: 'Sub category ID should must be a number',
  invalid_sub_category_object:
    'Sub Category Object Must be an array of an object must contain two elements { id: number, name: string }',
  invalid_budget_object:
    'Task Budget Object Must be an array of an object must contain two elements { start_value: number, end_value: number }, having start_value <= end_value',
  order_by_type: `Order By Type value must be from following: ${Object.values(
    ORDER_BY_TYPE,
  )}`,
  transaction_order_by: `Order By value must be from following: ${Object.values(
    TRANSACTION_ORDER_BY,
  )}`,
  user_order_by: `Order By value must be from following: ${Object.values(
    USER_ORDER_BY,
  )}`,
  tasks_order_by: `Order By value must be from following: ${Object.values(
    TASKS_ORDER_BY,
  )}`,
  attributes_order_by: `Order By value must be from following: ${Object.values(
    ATTRIBUTES_ORDER_BY,
  )}`,
  attributes_category_order_by: `Order By value must be from following: ${Object.values(
    ATTRIBUTES_CATEGORY_ORDER_BY,
  )}`,
  user_transaction_order_by: `Order By value must be from following: ${Object.values(
    TRANSACTION_USER_ORDER_BY,
  )}`,
  account_status_options: `Account status options must be from the following: Active, Suspended`,
};

export interface JwtPayload {
  email: string;
  user_id: number;
  user_role: number;
}
export interface GuestJwtPayload {
  unique_id: string;
  user_role: number;
}

export const SuccessMessage = {
  success: 'success',
  email_sent: 'An email has been sent to',
  verify_proceed: 'please verify and proceed',
  sign_up:
    'An email has been sent to your registered email address, please verify and proceed',
  check_inbox: 'Please check your inbox for verification code',
  account_verification_code_sent:
    'Please check your inbox, an account verification code sent to your mail',
  password_reset_code_sent:
    'Please check your inbox, password reset code sent to your mail',
  receive_verification_code:
    'You will receive a verification code on the registered email address',
  password_forgot_code_set:
    'Please check your inbox, verification code sent to you mail',
  password_reset: 'Your password has been reset successfully',
  callback_request: 'Your request has been sent',
  password_changed: 'Your password changed successfully',
  logged_out: 'Logged out',
  profile_updated: 'Profile is updated successfully',
  mail_sent: 'Mail has been sent successfully !',
  forgot_mail_sent:
    'Please check your inbox, forgot password mail has been sent successfully !',
  forgot_request_cancelled: 'Your forgot password request has been cancelled',
  email_updated: 'Your email has been updated',
  account_verified: 'Your account has been verified',
  verification_email_sent:
    'Please check your inbox, verification link has been sent to your mail',
  verified_success: 'User has been verified successfully.',
  reset_success: 'User has reset password successfully.',
  password_reset_success: 'Password has been reset successfully.',
  password_changed_success: 'Password has been changed successfully.',
  valid_link: 'Your provided link is valid.',
  code_valid_10_min: 'Your code is valid for 10 minutes!',
  nemID_details_updated: 'User NemID details has been updated successfully',
  update_successful: 'Updated successfully',
  delete_successful: 'Deleted successfully',
  new_card_added: 'New Card has been added successfully',
  card_removed: 'Card has been removed successfully',
  check_inbox_forgot_password:
    ' Please check your inbox, forgot password link has been sent to your mail',
  payment_success_assigned_specialist:
    'Task payment successfully completed and specialist has been assigned to your task.',
  task_invited_success: 'Specialist has been invited successfully.',
  report_profile_success: 'Profile has been reported successfully',
  money_transferrer_success:
    'Outstanding amount has been transferred successfully in your connected Stripe Account',
};

export const VALIDATION_MSG = {
  no_google_user: 'No Google user Found',
  no_facebook_user: 'No Facebook user Found',
  no_admin_user: 'No admin user found with given email address',
  user_using_normal_credentials:
    'User is already using Normal Login Credentials',
  user_using_social_media_credentials:
    'User is already using Social Media Credentials',
  validation_failed: 'Validation Failed',
  account_suspended:
    'Your account is suspended, you can not perform this action',
  invalid_email: 'No user found with given email address.',
  invalid_link: 'The link is invalid',
  invalid_password: 'Enter valid Password',
  changed_password_same: 'New password and old password can not be same',
  password_does_not_match:
    'New Password and New Confirm Password does not match',
  verify_email: 'Please verify email',
  invalid_user: 'Invalid User',
  code_invalid: 'Code is invalid',
  invalid_credentials: 'Invalid Credentials',
  forgot_password: 'A password email has been sent if it exists',
  account_not_exist: 'Could not find an account with given email.',
  account_already_verified: 'Account is already verified',
  invalid_verification_code: 'Invalid Verification Code',
  same_password: 'The password is same as old one, please use other password',
  user_not_exist: 'No User Exist with following email',
  user_exist_email: 'User already exist with following email',
  user_exist: 'User is already exist in the system.',
  data_not_found: 'No Data Found',
  user_not_exists: 'User Does not exists',
  no_user_report: 'No user found for given ID to report',
  incorrect_password: 'Incorrect current password',
  not_same_password: 'Current password and new password cannot be same',
  role_unauthorized: 'User Role is not authorized for this resource',
  phone_required_preferred_way:
    "Phone details are required as user's preferred way of contacting is phone",
  nemid_verification_required: 'NemID is required for user age between 13-18',
  role_validation: 'User is not Admin',
  album_not_exist: 'Could not find an album',
  media_not_exist: 'Could not find media file',
  media_already_exist: 'Already added',
  no_specialist_found: 'No specialist found for given ID',
  can_not_report_own_profile: 'User can not report his/her own profile',
  already_nemID_verified: 'User has already verified NemID details',
  user_already_suspended: 'User is already suspended',
  admin_can_not_suspend_his_account:
    'Admin can not suspend his/her own account',
  id_is_already_resolved: 'Given reported profile ID is already resolved',
  your_account: 'Your account',
  is_suspended_by_marketplace: 'is suspended by Marketplace',
  description_not_contain:
    'Description should not contain any email address, link or phone number',
};

export const VALIDATION_STRIPE_MSG = {
  no_stripe_id_found:
    'You need to complete your profile first then you can add card.',
  no_default_card_found: 'No default card found for your profile.',
  no_stripe_account_found:
    'No Stripe Customer Account found, please check whether you have completed your profile and created stripe connect account',
  no_stripe_standard_account:
    'No stripe standard account found for the account',
  no_card_found_deleted: 'No existing card found to be deleted',
  no_card_found_default: 'No existing card found to be make default',
  can_receive_payout: 'Payouts can be received',
  can_not_receive_payout:
    'Payout can not be received as account details are not completed',
  stripe_account_details_missing:
    'Stripe account document details are missing, please login into your stripe account and verify all the details',
  already_stripe_account_id_exists:
    'Already stripe account ID exists, can not create a new one',
  card_already_added:
    'Given card is already added, can not add the same card again',
};

export const VALIDATION_ALBUM_MSG = {
  album_with_same_name: 'Your album with same name already exists',
  no_sub_category_to_add_service: 'No Sub Category Found to add service',
  no_existing_service: 'No Existing Service Found for given data',
};

export const VALIDATION_TASK_MSG = {
  no_task: 'No Task Found for given ID',
  no_category_found: 'No Category found for the task',
  no_sub_category_found: 'No Sub category found for the task',
  no_pending_task:
    'No Pending Payment Task Found for given ID to complete payment',
  no_open_task: 'No existing open task found for given task id',
  no_active_task: 'No existing active task found for given task id',
  no_active_task_to_complete:
    'No existing active task found for given task id to be completed',
  no_complete_cancelled_task_to_report:
    'No existing completed or cancelled task found for given task id to be reported',
  no_complete_time_task_to_report:
    'No existing completed or reported task has completion time for given task id to be reported',
  no_open_task_to_accept_reject:
    'No Open task found for given ID to accept / reject Bid',
  no_open_task_to_create_update_bid:
    'No Open Task Found for given ID to make / update BID',
  no_cancel_task: 'No Cancelled Request task found',
  no_open_active_task_to_cancel: 'No Open, Active task found to cancelled',
  no_proof_active_task: 'For an active task media proof must be provided',
  can_no_report_task_48_hours:
    'Task Can not be reported after 48 hours of completion',
  no_proof_complete_task:
    'To complete an active task, media proof must be provided',
  no_proof_report_task:
    'To report a completed task, media proof must be provided',
  no_completed_cancelled_task_for_review:
    'No Completed or Cancelled Task found for review',
  no_bid_on_own_task: "Employer can't bid on his / her own task",
  task_is_already_reviewed: 'Given task is already reviewed by user',
  task_not_reported: 'The given task status is not marked as reported',
  no_reported_task: 'No reported task found for given ID',
  task_nem_id_required_no_bid:
    'Task requires NemID verification and in order to place bid, you need to verify your NemID',
  task_requires_freelancer: 'Task requires freelancer profile to create a bid',
  task_requires_business: 'Task requires business profile to create a bid',
};

export const VALIDATION_BID_MSG = {
  no_open_bid_to_accept: 'No Open bid found for given ID to accept',
  no_accepted_bid: 'No accepted bid found for given ID',
  no_open_bid_to_reject: 'No Open bid found for given ID to reject',
  bid_no_longer_open: 'BID is no longer open to be updated',
  bid_no_longer_created_cancelled:
    'As you have cancelled the bid, you can not place it again',
};

export const VALIDATION_NOTIFICATION_MSG = {
  no_unread_notification: 'No unread notification found to be updated',
};

export const VALIDATION_DISPUTE_MSG = {
  dispute_exists: 'Dispute already exists for given task_id and user_id',
};

export const VALIDATION_PAYMENT_MSG = {
  payment_from_outstanding: 'Payment from OutStanding Balance',
};

export const VALIDATION_CHAT_MSG = {
  no_init_chat: 'User can not initialize the chat',
  no_attachment_open_task:
    'No attachment can be sent because task status is open',
  no_room_found: 'No chat room found for given ID',
  room_not_active: 'Given room ID is not active',
  user_not_participant: 'User is not a participant in this room ID',
  user_can_not_archived_chat: 'User can not read the permanent deleted chat',
  room_not_active_trash: 'Given room ID is not active to move to trash',
  room_already_archived: 'Given room ID is already archived',
  room_permanent_deleted:
    'Give room is already deleted, can not read deleted data',
  room_not_trash_archive:
    'Given room ID is not in trash to move to permanent delete',
};

export const CUSTOM_RESPONSE_STATUS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLATION: 'CANCELLATION',
  REPORTED: 'REPORTED',
  DELETED: 'DELETED',
  SUSPENDED: 'SUSPENDED',
  REACTIVE: 'REACTIVE',
};

export const EMAIL_SUBJECT = {
  verification_link: 'Marketplace Verification Link',
  password_reset: 'Marketplace Password Reset Link',
  task_created: 'Task has been created',
  task_cancelled: 'Task has been cancelled',
  task_cancellation_request_created_employer:
    'Task Cancellation Request is created by employer',
  task_cancellation_request_created_specialist:
    'Task Cancellation Request is created by specialist',
  task_cancellation_approved: 'Task Cancellation Request has been approved',
  task_cancellation_rejected: 'Task Cancellation Request has been rejected',
  task_bid_placed: 'Specialist has bid on your task',
  task_bid_other_accepted: 'Employer has awarded the task to other Specialist',
  task_bid_accepted: 'Employer has accepted your offer',
  task_invite: 'A task has been suggested to you',
  task_reported_by_employer: 'Task has been Reported by Employer',
  task_reported_by_specialist: 'Task has been Reported by Specialist',
  task_cancelled_employer_account_suspended:
    'Task has been cancelled as employer account is suspended',
  task_marked_completed: 'Task has been marked as completed',
  task_open_specialist_account_suspended:
    'Task has been set to open as specialist account is suspended',
  account_suspended: 'Your Marketplace account is suspended',
  account_activated: 'Your Marketplace account is activated',
};

export const EMAIL_IMAGE_DOMAIN = process.env.IMAGE_SITE_URL;
export const MARKETPLACE_WEB = process.env.SITE_URL;

export const EMAIL_IMAGE_PATH = {
  images: 'upload/email/',
};

export const EMAIL_TEMPLATE = {
  welcome_account: './templates/welcome.hbs',
  verify_account: './templates/verify.hbs',
  forgot_password: './templates/forgot.hbs',
  task_create: './templates/taskCreate.hbs',
  task_cancelled: './templates/taskCancelled.hbs',
  task_cancel_request: './templates/taskCancelRequest.hbs',
  task_open_again: './templates/taskOpenAgain.hbs',
  task_completed: './templates/taskCompleted.hbs',
  task_cancel_approved: './templates/taskCancelApproved.hbs',
  task_cancel_rejected: './templates/taskCancelRejected.hbs',
  task_bid_placed: './templates/taskBidPlaced.hbs',
  task_bid_placed_list: './templates/taskBidPlacedList.hbs',
  task_bid_accepted: './templates/taskBidAccepted.hbs',
  task_invite: './templates/taskInvitation.hbs',
  task_bid_other_accepted: './templates/taskBidOtherAccepted.hbs',
  task_reported: './templates/taskReported.hbs',
  account_suspended: './templates/accountSuspended.hbs',
  account_activated: './templates/accountActivated.hbs',
};

export const REPORT_TASK_REASON = {
  task_cancellation_rejected: 'The task cancellation request was reject.',
};

export enum FILE_PATH {
  user_profile = 'upload/profile',
  new_task = 'upload/tasks/new',
  cancel_task = 'upload/tasks/cancel',
  cancel_task_disagreed = 'upload/tasks/disagree',
  complete_task = 'upload/tasks/complete',
  report_task = 'upload/tasks/report',
  report_user = 'upload/user/report',
  album_media = 'upload/album',
  chat_media = 'upload/chat',
}

export enum FILE_TYPE {
  image = 'image',
  video = 'video',
}

export enum FILE_ERROR {
  edit_file_name = 'Error in editFileName',
  file_upload = 'Error in File Upload',
  invalid_task_media_extension = 'Only jpg,png,jpeg,mp3,mp4,mov files are allowed!',
  invalid_profile_extension = 'Only jpg,png,jpeg files are allowed!',
  invalid_extension_chat = 'Only jpg,png,jpeg,mp4,mov,pdf,doc,xls files are allowed!',
  big_image = 'Image file is too large, max is allowed is 2MB',
  big_image_application = 'Given file is too large, max is allowed is 2MB',
  big_video = 'Video file is too large, max is allowed is 5MB',
}

export enum FILE_SIZE {
  total_profile_media = 1, // Number of total media files that can be uploaded
  task_total_media = 10, // Number of total media files that can be uploaded
  task_image = 10 * 1024 * 1024, // 10 MB
  profile_image = 10 * 1024 * 1024, // 10 MB
  task_video = 100 * 1024 * 1024, // 100 MB
  report_video = 100 * 1024 * 1024, // 100 MB
  report_image = 10 * 1024 * 1024, // 10 MB
  total_report_image = 10, // Number of total media files that can be uploaded
  chat_image_application = 10 * 1024 * 1024, // 10 MB
  chat_video = 100 * 1024 * 1024, // 100 MB
}

export const ResponseMap = <T>(
  data: T,
  message?: string | '',
  status?: boolean,
): { data: T; message: string; status: boolean } => {
  return {
    data,
    message: message || '',
    status: status || true,
  };
};

export const ADMIN_ATTRIBUTE_VALIDATION_MSG = {
  no_parent_category: 'No Parent Category found for given ID',
  no_sub_category: 'No Sub Category found for given ID',
  category_exists: 'Category with similar name already exists',
  sub_category_exists: 'Sub category with similar name already exists',
};

export const CATEGORY_TYPE = {
  parent_category: 'Parent Category',
  sub_category: 'Sub Category',
  both_category: 'Parent & Sub Category',
};

export const ADD_TYPE_OF_SERVICES_VALIDATION_MSG = {
  category_not_exits: 'Category does not exits',
  sub_category_not_exits: 'Sub category does not exits',
  sub_category_exits: 'Sub category already exits',
  services_not_exits: 'Services do not exits',
};

export const ADD_TYPE_OF_SERVICES_SUCCESSFUL_MSG = {
  sub_category_added: 'Successfully added sub category',
  type_of_service_added: 'Successfully added Type of Service',
};
