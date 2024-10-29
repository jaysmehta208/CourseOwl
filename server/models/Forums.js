import mongoose from 'mongoose';
import { ObjectId} from "bson";
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    forumId:Schema.ObjectId,
    course_name: {
        type: String
    },
    course_code: {
        type: String
    },
    name: { //professor name
        type: String
    },
    alias: {
        type: String
    },
    tags: {
        type: [String]
    },
    posts: [{
        title: {
            type: String
        },
        body: {
            type: String
        },
        tag: {
            type: String
        },
        author: {
            type: String
        },
        anon: {
            type: Boolean
        },
        comments: [{
            author: {
                type: String
            },
            body: {
                type: String
            },
            anon: {
                type: Boolean
            },
        }],
    }],
    
}, { collection: 'forums' });

const Forum = mongoose.models.Forum || mongoose.model('forums', forumSchema);
export default Forum;