"use strict";
/**
 * Seed the octofit_db database with test data
 *
 * This script initializes the MongoDB database with sample users, teams,
 * activities, workouts, and leaderboard entries for testing and development.
 *
 * Usage: ts-node src/scripts/seed.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seed() {
    try {
        console.log('🌱 Starting database seeding...');
        console.log(`📦 Connecting to MongoDB at ${MONGODB_URI}`);
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        // Clear existing data
        console.log('\n🗑️  Clearing existing data...');
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        console.log('✅ Data cleared');
        // Create sample users
        console.log('\n👥 Creating sample users...');
        const users = await User_1.User.insertMany([
            {
                name: 'Alex Runner',
                email: 'alex@octofit.com',
                password: 'hashed_password_1', // In production, these would be hashed
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
            },
            {
                name: 'Sam Cyclist',
                email: 'sam@octofit.com',
                password: 'hashed_password_2',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam'
            },
            {
                name: 'Jordan Yogi',
                email: 'jordan@octofit.com',
                password: 'hashed_password_3',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
            },
            {
                name: 'Casey Swimmer',
                email: 'casey@octofit.com',
                password: 'hashed_password_4',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey'
            },
            {
                name: 'Morgan Gym',
                email: 'morgan@octofit.com',
                password: 'hashed_password_5',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan'
            }
        ]);
        console.log(`✅ Created ${users.length} users`);
        // Create sample teams
        console.log('\n👨‍👩‍👧‍👦 Creating sample teams...');
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Runners United',
                description: 'A team of dedicated runners pushing their limits',
                members: [users[0]._id, users[1]._id],
                createdBy: users[0]._id
            },
            {
                name: 'Wellness Warriors',
                description: 'Focused on holistic health and wellness',
                members: [users[2]._id, users[3]._id, users[4]._id],
                createdBy: users[2]._id
            }
        ]);
        console.log(`✅ Created ${teams.length} teams`);
        // Create sample workouts
        console.log('\n💪 Creating sample workouts...');
        const workouts = await Workout_1.Workout.insertMany([
            {
                name: 'Morning Run',
                description: 'Easy-paced morning run to start the day',
                duration: 30,
                intensity: 'low',
                calories: 300,
                difficulty: 'easy',
                targetedMuscles: ['legs', 'cardio']
            },
            {
                name: 'HIIT Training',
                description: 'High intensity interval training for maximum calorie burn',
                duration: 25,
                intensity: 'high',
                calories: 400,
                difficulty: 'hard',
                targetedMuscles: ['full-body', 'cardio']
            },
            {
                name: 'Yoga Session',
                description: 'Relaxing yoga session for flexibility and mindfulness',
                duration: 45,
                intensity: 'low',
                calories: 150,
                difficulty: 'easy',
                targetedMuscles: ['flexibility', 'core']
            },
            {
                name: 'Strength Training',
                description: 'Build muscle strength with weights and resistance',
                duration: 50,
                intensity: 'medium',
                calories: 350,
                difficulty: 'medium',
                targetedMuscles: ['upper-body', 'lower-body']
            },
            {
                name: 'Cycling Adventure',
                description: 'Long-distance cycling for endurance',
                duration: 60,
                intensity: 'medium',
                calories: 500,
                difficulty: 'medium',
                targetedMuscles: ['legs', 'cardio']
            }
        ]);
        console.log(`✅ Created ${workouts.length} workouts`);
        // Create sample activities
        console.log('\n🏃 Creating sample activities...');
        const today = new Date();
        const activities = await Activity_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'Running',
                distance: 5,
                duration: 30,
                calories: 300,
                date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
                description: 'Morning jog in the park'
            },
            {
                userId: users[0]._id,
                type: 'Running',
                distance: 7,
                duration: 45,
                calories: 420,
                date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
                description: 'Evening run at moderate pace'
            },
            {
                userId: users[1]._id,
                type: 'Cycling',
                distance: 20,
                duration: 60,
                calories: 500,
                date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
                description: 'Long-distance bike ride'
            },
            {
                userId: users[2]._id,
                type: 'Yoga',
                distance: 0,
                duration: 45,
                calories: 150,
                date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
                description: 'Relaxing vinyasa flow'
            },
            {
                userId: users[3]._id,
                type: 'Swimming',
                distance: 2,
                duration: 40,
                calories: 400,
                date: today,
                description: 'Swimming laps at the pool'
            },
            {
                userId: users[4]._id,
                type: 'Gym',
                distance: 0,
                duration: 50,
                calories: 350,
                date: today,
                description: 'Weight training session'
            }
        ]);
        console.log(`✅ Created ${activities.length} activities`);
        // Create leaderboard entries
        console.log('\n📊 Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[0]._id,
                points: 1500,
                rank: 1,
                achievements: ['Streak Master', 'Distance Runner', 'Early Bird']
            },
            {
                userId: users[1]._id,
                points: 1200,
                rank: 2,
                achievements: ['Cyclist Pro', 'Endurance Master']
            },
            {
                userId: users[2]._id,
                points: 950,
                rank: 3,
                achievements: ['Zen Master', 'Flexibility Champion']
            },
            {
                userId: users[3]._id,
                points: 800,
                rank: 4,
                achievements: ['Water Warrior']
            },
            {
                userId: users[4]._id,
                points: 750,
                rank: 5,
                achievements: ['Iron Lifter', 'Strength Builder']
            }
        ]);
        console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);
        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('✨ Database seeding completed successfully!');
        console.log('='.repeat(50));
        console.log(`📊 Summary:`);
        console.log(`  • Users: ${users.length}`);
        console.log(`  • Teams: ${teams.length}`);
        console.log(`  • Workouts: ${workouts.length}`);
        console.log(`  • Activities: ${activities.length}`);
        console.log(`  • Leaderboard entries: ${leaderboardEntries.length}`);
        console.log('='.repeat(50));
        await mongoose_1.default.disconnect();
        console.log('\n✅ Disconnected from MongoDB');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map