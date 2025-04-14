const cron = require('node-cron');
const { User, Attendance } = require('../models');
const { ATTENDANCE_STATUS } = require('../utils/constants');

const { Op } = require('sequelize');

cron.schedule('50 23 * * *', async () => {
    try {
        console.log('Running daily attendence status cron job...');
        // Fetch all users
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
                    status: ATTENDANCE_STATUS.ABSENT,
                    date: new Date(),
                });
                console.log(`Attendance created for user ${user.name} , id: ${user.id}`);
            } else {
                const checkInExists = !!existing.checkIn;
                const checkOutExists = !!existing.checkOut;

                if (checkInExists && !checkOutExists) {
                    await existing.update({
                        status: ATTENDANCE_STATUS.HALF_DAY,
                        date: new Date(),
                    });
                    console.log(`${user.name} (${user.id}): Half Day (missing check-out)`);
                } else if (!checkInExists && !checkOutExists) {
                    await existing.update({
                        status: ATTENDANCE_STATUS.ABSENT,
                        date: new Date(),
                    });
                    console.log(`${user.name} (${user.id}): Half Day (no check-in/out)`);
                } else {
                    await existing.update({
                        status: ATTENDANCE_STATUS.PRESENT,
                        date: new Date(),
                    });
                    console.log(`${user.name} (${user.id}): Present`);
                }
            }
        }
    } catch (err) {
        console.error('Error in salary cron:', err);
    }
});
