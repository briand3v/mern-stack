const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    cuid: { type: 'String', required: true },
    images: [
        {
            url: { type: 'String', required: false  },
            publicId: { type: 'String', required: false }
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);
