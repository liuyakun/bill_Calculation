/**
 *  作者：yeshengqiang
 *  时间：2017-09-20
 *  描述：上传混合类
 */

export default {
    methods: {
        beforeAvatarUpload (file) {
            let format = this.$store.state.imgFormat;
            let size = this.$store.state.imgSize;
            let isJPG = false;
            const isLt2M = file.size / 1024 / 1024 < parseInt(size);
            format.forEach(item => {
                if (file.type.indexOf(item) > -1) {
                    isJPG = true;
                }
            });
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!');
                return false;
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false;
            }
            return isJPG && isLt2M;
        }
    }
};
