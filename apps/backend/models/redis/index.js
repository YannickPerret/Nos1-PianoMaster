import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
    console.error(error);
});

const redisConnection = async () => {
    try {
        await redisClient.auth(process.env.REDIS_PASSWORD);
    } catch (error) {
        console.error(error);
    }
};

export { redisConnection, redisClient };
