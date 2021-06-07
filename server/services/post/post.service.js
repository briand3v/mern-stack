const cloudinary = require('../../utils/cloudinary');

const uploadImagesPost = async (post, files) => {
    try {
        // upload multiple images
        for (const file of files) {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(file.path);
            if (!result) continue;
            post.images.push({
                url: result.url,
                publicId: result.public_id
            });
        }
        // update post
        return await post.save();
    } catch(error) {
        return new Error(error);
    }
}

module.exports = {
    uploadImagesPost
};
