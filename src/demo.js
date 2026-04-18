import client from './redisClient.js';
import {
  createApplication,
  getApplication,
  getApplicationsByListing,
  getApplicationsByUser,
  updateApplicationStatus,
  updateApplicationMessage,
  deleteApplication,
} from './applicationStore.js';

async function runDemo() {
  try {
    // 1. Connect to Redis
    await client.connect();
    console.log('Connected to Redis');

    // 2. Clear database
    await client.flushAll();
    console.log('Database cleared\n');

    // 3. Create applications
    console.log('Creating applications...\n');

    await createApplication({
      application_id: 'app1001',
      listing_id: 'list501',
      applicant_user_id: 'user33',
      applied_at: '2026-04-17T10:15:00Z',
      status: 'pending',
      message: 'Interested in subleasing from June to August',
    });

    await createApplication({
      application_id: 'app1002',
      listing_id: 'list501',
      applicant_user_id: 'user44',
      applied_at: '2026-04-17T11:00:00Z',
      status: 'pending',
      message: 'Looking for short-term stay',
    });

    // 4. Get one application
    console.log('Fetching one application:\n');
    console.log(await getApplication('app1001'), '\n');

    // 5. Get applications by listing
    console.log('Applications for listing list501:\n');
    console.log(await getApplicationsByListing('list501'), '\n');

    // 6. Get applications by user
    console.log('Applications for user user33:\n');
    console.log(await getApplicationsByUser('user33'), '\n');

    // 7. Update status
    console.log('Updating application status...\n');
    await updateApplicationStatus('app1001', 'approved');
    console.log(await getApplication('app1001'), '\n');

    // 8. Update message
    console.log('Updating application message...\n');
    await updateApplicationMessage('app1002', 'Updated message text');
    console.log(await getApplication('app1002'), '\n');

    // 9. Delete application
    console.log('Deleting application app1001...\n');
    await deleteApplication('app1001');

    // 10. Final state
    console.log('Final applications for listing list501:\n');
    console.log(await getApplicationsByListing('list501'), '\n');

  } catch (error) {
    console.error('Error running demo:', error);
  } finally {
    // 11. Disconnect
    await client.quit();
    console.log('Disconnected from Redis');
  }
}

runDemo();