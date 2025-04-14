const cron = require('node-cron');
const { User, Attendance } = require('../models'); // Adjust path as needed
const { Op } = require('sequelize');

cron.schedule('50 23 * * *', async () => {
    try {
        console.log('Running daily attendence status cron job...');

        // Example: Create attendance status record for users who don’t have one for current month
        const users = await User.findAll();

        const todayStart = new Date().setHours(0, 0, 0, 0);
        const todayEnd = new Date().setHours(23, 30, 59, 999);

        for (const user of users) {
            const existing = await Attendance.findOne({
                where: {
                    userId: user.id,
                    createdAt: {
                        [Op.between]: [todayStart, todayEnd]
                    }
                }
            });

            if (!existing) {
                await Attendance.create({
                    userId: user.id,
                    status: 'Absent',
                    date: new Date(),
                });
                console.log(`Attendance created for user ${user.name}`);
            } else {
                if (existing.checkOut === null || existing.checkOut === undefined || existing.checkOut === '') {
                    await existing.update({
                        status: 'Half Day',
                        checkOut: new Date(),
                        date: new Date(),
                    });
                    console.log(`Attendance updated for user ${user.name}`);
                } else {
                    await existing.update({
                        status: 'Present',
                        checkIn: new Date(),
                        date: new Date(),
                    });
                    console.log(`Attendance updated for user ${user.name}`);
                }
            }
        }
    } catch (err) {
        console.error('Error in salary cron:', err);
    }
});
