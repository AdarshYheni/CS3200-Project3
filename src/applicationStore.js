import client from './redisClient.js';

/**
 * Create a new application
 */
export async function createApplication(application) {
  const {
    application_id,
    listing_id,
    applicant_user_id,
    applied_at,
    status,
    message,
  } = application;

  // 1. Create the hash
  await client.hSet(`application:${application_id}`, {
    application_id,
    listing_id,
    applicant_user_id,
    applied_at,
    status,
    message,
  });

  // 2. Add to listing set
  await client.sAdd(`listing:${listing_id}:applications`, application_id);

  // 3. Add to user set
  await client.sAdd(`user:${applicant_user_id}:applications`, application_id);
}

/**
 * Get one application by ID
 */
export async function getApplication(applicationId) {
  return await client.hGetAll(`application:${applicationId}`);
}

/**
 * Get all applications for a listing
 */
export async function getApplicationsByListing(listingId) {
  const appIds = await client.sMembers(`listing:${listingId}:applications`);

  const applications = [];
  for (const id of appIds) {
    const app = await client.hGetAll(`application:${id}`);
    applications.push(app);
  }

  return applications;
}

/**
 * Get all applications for a user
 */
export async function getApplicationsByUser(userId) {
  const appIds = await client.sMembers(`user:${userId}:applications`);

  const applications = [];
  for (const id of appIds) {
    const app = await client.hGetAll(`application:${id}`);
    applications.push(app);
  }

  return applications;
}

/**
 * Update application status
 */
export async function updateApplicationStatus(applicationId, newStatus) {
  await client.hSet(`application:${applicationId}`, 'status', newStatus);
}

/**
 * Update application message
 */
export async function updateApplicationMessage(applicationId, newMessage) {
  await client.hSet(`application:${applicationId}`, 'message', newMessage);
}

/**
 * Delete an application
 */
export async function deleteApplication(applicationId) {
  // Get the application first (needed to know listing_id and user_id)
  const app = await client.hGetAll(`application:${applicationId}`);

  if (!app.application_id) {
    console.log('Application not found');
    return;
  }

  const { listing_id, applicant_user_id } = app;

  // 1. Remove from listing set
  await client.sRem(`listing:${listing_id}:applications`, applicationId);

  // 2. Remove from user set
  await client.sRem(`user:${applicant_user_id}:applications`, applicationId);

  // 3. Delete the hash
  await client.del(`application:${applicationId}`);
}