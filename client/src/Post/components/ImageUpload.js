import React from 'react';
import ImageUploading from 'react-images-uploading';
import animationData from '../../upload.json';
import Lottie from 'react-lottie';

const uploadContent = ({ onDrop, uploadWrapper, textClass }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return <>
        <ImageUploading
            multiple
            value={[]}
            onChange={onDrop}
            dataURLKey="data_url"
            acceptType={['jpeg', 'jpg', 'png']}
        >
            {({
                onImageUpload,
                dragProps,
            }) => (
                <div className={uploadWrapper} >
                    <button
                        className={textClass}
                        style={{ border: 0, backgroundColor: 'transparent' }}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        <Lottie options={defaultOptions}
                            height={100}
                            width={100}
                            isStopped={false}
                            isPaused={false} />
                        <p className="m-2">Upload images here</p>
                    </button>
                </div>
            )}
        </ImageUploading>
    </>
};

export default uploadContent;